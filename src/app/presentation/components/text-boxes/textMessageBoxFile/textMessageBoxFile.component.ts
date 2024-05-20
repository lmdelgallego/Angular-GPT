import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {

  @Input() placeholder: string = '';

  @Output() onMessage = new EventEmitter<TextMessageEvent>();


  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [''],
    file: [ null , Validators.required],
  });
  public file: File | null = null;

  handlerSelectedFile( event: Event ) {
    let fileList = (<HTMLInputElement>event.target).files;
    if( !fileList ) return;
    if( fileList.length <= 0 ) return;
    const file = fileList[0];
    //@ts-ignore
    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if ( this.form.invalid ) return;

    const { prompt, file } = this.form.value;
    console.log(file);
    this.onMessage.emit({ prompt, file: file!} );
    this.form.reset();

  }

}
