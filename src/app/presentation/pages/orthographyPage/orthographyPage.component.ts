import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageSelectEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiSerice } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {


  public messages = signal<Message[]>([
    {
      text: 'Hello! I am a GPT-3 model. I can help you with your orthography. Please upload a text file or type a message.',
      isGpt: true,

    },
    {
      text: 'Hello! GPT, I have a question about the word "orthography".',
      isGpt: false,
    }
  ]);
  public isLoading = signal<boolean>(false);
  public opneAiService = inject( OpenAiSerice)

  handleMessage( {prompt, file, selectedOption }: any ) {

    console.log({ prompt, file, selectedOption });

  }

}
