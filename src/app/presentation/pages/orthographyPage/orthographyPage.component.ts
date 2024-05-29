import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageSelectEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent, GptMessageOrthographyComponent } from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

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
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService)

  handleMessage( prompt: string ) {

    this.isLoading.set(true);

    console.log(
      {
        isGpt: false,
        text: prompt,
      }
    )

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      }
    ]);

    this.openAiService.checkOrthography(prompt)
      .subscribe( resp => {
        this.isLoading.set(false);
        this.messages.update( (prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ])
      })

  }

}
