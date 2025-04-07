import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autodesk',
  standalone: false,
  templateUrl: './autodesk.component.html',
  styleUrl: './autodesk.component.scss'
})

export class AutodeskComponent implements OnInit {
  ngOnInit(): void {

    const getToken = (onGetAccessToken:(token:string, expire:number)=>void) => {
      const xhr = new XMLHttpRequest()
  
      xhr.open('GET', '/api/forge/token')
      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          if (xhr.response)  onGetAccessToken(JSON.parse(xhr.response).access_token, 86400)
        }
        if (xhr.status != 200) {
          console.log(xhr.status)
        }
      }
      xhr.send()
    }
  
    function initialize () {
      const options = {
        env: 'AutodeskProduction',
        getAccessToken: getToken,
        refreshToken: getToken,
        api: 'derivativeV2'
      }
  
      const viewerContainer = document.getElementById('viewerDiv')
      const viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerContainer)
  
      Autodesk.Viewing.Initializer(options, function onInitialized () {
        Autodesk.Viewing.Document.load(documentId, (doc:Autodesk.Viewing.Document) => {
          const geometries = doc.getRoot().search({ 'type': 'geometry' })
          if (geometries.length === 0) {
            messageModalBox.modal('show').find('.modal-body').text('Document contains no geometries.')
            return
          }
  
          // Choose any of the avialable geometries
          const initGeom = geometries[0]
  
          // Load the chosen geometry
          const svfUrl = doc.getViewablePath(initGeom)
          const modelOptions = {
            sharedPropertyDbPath: doc.getPropertyDbPath()
          }
          viewer.start(svfUrl, modelOptions)
        }, (viewerErrorCode:number) => messageModalBox.modal('show').find('.modal-body').text('onDocumentLoadFailure() - errorCode:' + viewerErrorCode), null)
      })
    }
  }
}
