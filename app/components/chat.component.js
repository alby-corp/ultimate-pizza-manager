import template from '../views/creator.html';

import {BaseComponent} from "./base.component";
import {albiReply, ALBITHOUGHTS} from "../services"

export class ChatComponent extends BaseComponent {

    constructor() {
        super(template);

        this.execute = async () => {

            const element = $('#chat-outlet');

            const action = (name, handler) => {
                element.on(name, e => {
                    handler(e);
                });
            };

            const delay = ms => {
                const deferred = $.Deferred();
                setTimeout(deferred.resolve, ms);

                return deferred.promise();
            };


            const renderMessage = (message) =>{
                return `
                    <div class="message ${message.from === 'alby' ? 'message-alby' : 'message-user'}">
                        ${message.text}
                    </div>
                `;
            };

            const render = () => {

                const renderButton = () => {
                    return `
                    <div class="btn-chat-open" onclick="AlbyJs.trigger(this, 'open')">
                    </div>`;
                };

                const renderChat = () => {
                    return `                   
                        <div class="chat-ui">
                            <div class="chat-header">
                                Alby<a class="btn-chat-close" onclick="AlbyJs.trigger(this, 'close')">&times;</a>
                            </div>
                            <div class="chat-messages">    
                            </div>
                            <div class="chat-typing">Sto scrivendo...</div>
                            <div class="chat-input">
                                <input class="form-control" type="text" placeholder="Come posso aiutarti?" onkeypress="if (event.keyCode === 13){ event.preventDefault(); AlbyJs.trigger(this, 'send')}">    
                                <a class="btn-chat-send" onclick="AlbyJs.trigger(this, 'send')">&#x27a4;</a>  
                            </div>
                    </div>`;
                };

                return `
                    <div id="chat" class="chat-closed">
                            ${renderChat()}
                            ${renderButton()}
                    </div>`;
            };

            element.html(render());

            const dom = {
                chat: element.find('#chat'),
                input: element.find('.chat-input input'),
                typing: element.find('.chat-typing'),
                messages: element.find('.chat-messages')
            };

            const postMessage = message => {
                dom.messages.append(renderMessage(message));
                setTimeout(() => dom.messages[0].scrollTop = dom.messages[0].scrollHeight, 0);
            };

            const createResponse = (text) =>{
                const response = albiReply(text, ALBITHOUGHTS);
                return [response, response.length * 80]
            };

            let messageQueue = $.when(1);
            const respond = text => {
                const [response, wait] = createResponse(text);

                messageQueue = messageQueue.then(async () => {
                    await delay(Math.floor(Math.random() * 300) + 300);

                    dom.typing.addClass('chat-typing-visible');

                    await delay(wait);

                    dom.typing.removeClass('chat-typing-visible');

                    postMessage({
                        from: 'alby',
                        text: response
                    });
                });
            };

            action('open', () => {
                dom.chat.addClass('animate');

                dom.chat.removeClass('chat-closed');
                dom.chat.addClass('chat-open');
            });

            action('close', () => {
                dom.chat.addClass('chat-closed');
                dom.chat.removeClass('chat-open');
            });

            action('send', () => {
                const text = dom.input.val();
                if (text === ''){
                    return;
                }

                postMessage({
                    from: 'user',
                    text: dom.input.val()
                });

                dom.input.val('');

                respond(text);
            });

            return this;
        };
    }
}
