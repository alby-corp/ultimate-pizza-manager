import template from '../views/creator.html';

import {BaseController} from "./base.controller";

export class ChatController extends BaseController {

    constructor() {
        super(template);

        this.execute = async () => {

            const element = $('#chat-outlet');

            const action = (name, handler) => {
                element.on(name, e => {
                    handler(e);
                });
            };

            const model = {
                open: false,
                messages: []
            };

            const renderMessages = (messages) =>{
                return messages.map(message => `
                    <div class="${message.from === 'alby' ? 'message-alby' : 'message-user'}">
                        ${message.text}
                    </div>
                `).join('');
            };

            const render = (model) => {

                const renderButton = () => {
                    return `
                    <div class="btn-chat-open" onclick="AlbyJs.trigger(this, 'open')">
                    </div>`;
                };

                const renderChat = () => {
                    return `
                    <div class="chat-container">
                        <div class="chat-reveal">
                            <div class="chat-header">
                                Alby<a class="btn-chat-close" onclick="AlbyJs.trigger(this, 'close')">&times;</a>
                            </div>
                            <div class="chat-messages">    
                                ${renderMessages(model.messages)}                        
                            </div>
                            <div class="chat-typing">Sto scrivendo...</div>
                            <div class="chat-input">
                                <input class="form-control" type="text" placeholder="Come posso aiutarti?" onkeypress="if (event.keyCode === 13)AlbyJs.trigger(this, 'send')">    
                                <a class="btn-chat-send" onclick="AlbyJs.trigger(this, 'send')">&#x27a4;</a>  
                            </div>
                        </div>
                    </div>`;
                };

                return `
                    <div id="chat" class="${model.open ? 'chat-open' : 'chat-closed'}">
                        ${model.open ? renderChat() : renderButton()}
                    </div>`;
            };

            const postMessage = message => {
                model.messages.push(message);

                const messages = element.find('.chat-messages');

                messages.html(renderMessages(model.messages));
                messages[0].scrollTop = messages[0].scrollHeight;
            };

            const respond = text => {
                const response = 'cosa?';

                const typing = element.find('.chat-typing');

                setTimeout(() => {
                    typing.addClass('chat-typing-visible');

                    setTimeout(() => {
                        typing.removeClass('chat-typing-visible');

                        postMessage({
                            from: 'alby',
                            text: response
                        });
                    }, response.length * 200);
                }, Math.floor(Math.random() * 300) + 300);
            };

            action('open', () => {
                model.open = true;
                element.html(render(model));

                const messages = element.find('.chat-messages');
                messages[0].scrollTop = messages[0].scrollHeight;
            });

            action('close', () => {
                model.open = false;
                element.html(render(model));
            });

            action('send', () => {
                const input = element.find('.chat-input input');
                const text = input.val();

                postMessage({
                    from: 'user',
                    text: input.val()
                });

                respond(text);

                input.val('');
            });

            element.html(render(model));

            return this;
        };
    }
}
