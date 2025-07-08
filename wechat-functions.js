// 模拟微信交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化聊天数据
    const chatData = [
        { type: 'received', content: '你好！最近怎么样？', time: '10:30' },
        { type: 'sent', content: '我挺好的，你呢？', time: '10:31' },
        { type: 'received', content: '我也不错，想约你周末一起打球', time: '10:32' }
    ];
    
    // 渲染聊天消息
    function renderMessages() {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.innerHTML = '';
        
        chatData.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}`;
            
            let avatarHtml = `<div class="avatar"></div>`;
            if (msg.type === 'received') {
                // 接收消息的头像
                avatarHtml = `<div class="avatar" style="background-image: url('https://picsum.photos/id/1005/40/40'); background-size: cover;"></div>`;
            } else {
                // 发送消息的头像
                avatarHtml = `<div class="avatar" style="background-image: url('https://picsum.photos/id/1012/40/40'); background-size: cover;"></div>`;
            }
            
            messageDiv.innerHTML = `
                ${avatarHtml}
                <div class="content">
                    <div class="bubble">${msg.content}</div>
                    <div class="time" style="font-size: 10px; color: #888; text-align: ${msg.type === 'sent' ? 'right' : 'left'}">${msg.time}</div>
                </div>
            `;
            
            chatContainer.appendChild(messageDiv);
        });
        
        // 滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // 初始化底部标签页切换
    function initTabs() {
        const tabs = document.querySelectorAll('.bottom-bar .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // 模拟切换标签页效果
                const tabIndex = Array.from(tabs).indexOf(this);
                console.log(`切换到标签页: ${tabIndex}`);
            });
        });
    }
    
    // 初始化发送消息功能
    function initSendMessage() {
        const inputField = document.querySelector('.input-area input');
        const sendBtn = document.querySelector('.send-btn');
        
        function sendMessage() {
            const message = inputField.value.trim();
            if (message) {
                // 添加新消息
                const now = new Date();
                const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                chatData.push({
                    type: 'sent',
                    content: message,
                    time: time
                });
                
                // 清空输入框并重新渲染
                inputField.value = '';
                renderMessages();
                
                // 模拟回复
                setTimeout(() => {
                    chatData.push({
                        type: 'received',
                        content: '好的，我收到了你的消息',
                        time: time
                    });
                    renderMessages();
                }, 1000);
            }
        }
        
        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // 初始化界面
    renderMessages();
    initTabs();
    initSendMessage();
    
    // 模拟语音按钮长按效果
    const voiceBtn = document.querySelector('.voice-btn');
    let longPressTimer;
    
    voiceBtn.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(() => {
            console.log('长按语音按钮，开始录音...');
            voiceBtn.innerHTML = '松开结束';
        }, 300);
    });
    
    voiceBtn.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
        voiceBtn.innerHTML = '<i class="fa fa-microphone"></i>';
        console.log('松开语音按钮，结束录音');
    });
    
    // 模拟添加按钮点击效果
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', function() {
        console.log('点击添加按钮');
        // 这里可以显示更多功能菜单
    });
});    