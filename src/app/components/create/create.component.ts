import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: String;
  public project: Project;
  public status: boolean;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto"
    this.project = new Project('', '', '', '', 2019, '', '');
    this.status = false;
    this.filesToUpload = [];
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    console.log(this.project);

    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {

          //Subir la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image').then((result: any) => {
            this.status = true;
            form.reset();
          });

        } else {
          this.status = false;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files;
    console.log(this.filesToUpload);
  }


}
