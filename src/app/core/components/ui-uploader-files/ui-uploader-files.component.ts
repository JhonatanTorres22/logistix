import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FileUploadModule, FileUploadTypes, FileUploadValidators } from '@iplab/ngx-file-upload';
import { UploaderModule } from 'angular-uploader';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MensajeriaSignal } from 'src/app/mensajeria/domain/signals/mensajeria.signal';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

const apiKey = 'free';

@Component({
  selector: 'ui-uploader-files',
  standalone: true,
  imports: [ CommonModule, SharedModule, FileUploadModule, UploaderModule],
  templateUrl: './ui-uploader-files.component.html',
  styleUrl: './ui-uploader-files.component.scss'
})
export class UiUploaderFilesComponent {

  @Input() typeFile: string[] = ['application/pdf']
  private filesControl = new UntypedFormControl(null, [FileUploadValidators.filesLimit(2),FileUploadValidators.accept( this.typeFile )]);

  file = this.mensajeriaSignal.file;


  constructor(
    private mensajeriaSignal: MensajeriaSignal
  ) {

  }
  @Input() showButton: boolean = true;

  filesForm = new UntypedFormGroup({
    files: this.filesControl
  });

  // private method
  toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

  uploader = Uploader({ apiKey });
  options: UploadWidgetConfig = {
    multi: false,
    
  };

  onComplete = (files: UploadWidgetResult[]) => {
    console.log('complete...', files);
    
    this.uploadedFileUrl = files[0]?.fileUrl;
  };

  setFile = () => {
    console.log('ddd');
    
    this.file.set( this.filesForm.value )
  }

  uploadedFileUrl: string | undefined = undefined;
}
