# BIMViewers

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## API

Based on Azure functions

[Quickstart: Create a C# function in Azure from the command line](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-csharp?tabs=windows%2Cazure-cli)

To deploy it :

```bash
cd .\bimviewers-api\ 
func azure functionapp publish func-bim42-prod-fr-bimviewers
```

## Autodesk

I am using the unoficial APS CLI to create the bucket

```shell
apsbot bucket-create
Bucket Name [autodesk-viewer]: bim42-autodesk-viewer
Select Bucket Key (1: transient, 2: temporary, 3: persistent) (1, 2, 3): 3
Region [EMEA]:


Bucket created successfully!
{
    "bucketKey": "bim42-autodesk-viewer",
    "bucketOwner": "crAfIEI62fD6vidqt0QfBjjOFc2MnDA1U3p8Kb6BEADaWUuH",
    "createdDate": 1744227810377,
    "permissions": [
        {
            "authId": "crAfIEI62fD6vidqt0QfBjjOFc2MnDA1U3p8Kb6BEADaWUuH",
            "access": "full"
        }
    ],
    "policyKey": "persistent"
}

```

```shell
apsbot  bucket-upload-object
Bucket Name [bim42-autodesk-viewer]:
Region [EMEA]:
Object Name [apsbot7e5cffd6-97c2-40f7-aa1a-2e8dac224799]:
File Path: Downloads\Snowdon Towers Sample Architectural.ifc
Object uploaded successfully!
{
    "bucketKey": "bim42-autodesk-viewer",
    "objectId": "urn:adsk.objects:os.object:bim42-autodesk-viewer/apsbot7e5cffd6-97c2-40f7-aa1a-2e8dac224799",
    "objectKey": "apsbot7e5cffd6-97c2-40f7-aa1a-2e8dac224799",
    "size": 85507035,
    "contentType": "application/octet-stream",
    "location": "https://developer.api.autodesk.com/oss/v2/buckets/bim42-autodesk-viewer/objects/apsbot7e5cffd6-97c2-40f7-aa1a-2e8dac224799"
}
```

https://aps.autodesk.com/en/docs/model-derivative/v2/tutorials/prep-file4viewer/

I am then using the Postman collection to transform the file

https://github.com/autodesk-platform-services/aps-tutorial-postman/blob/master/ModelDerivative_04/instructions/task-1.md

```json
{
    "result": "success",
    "urn": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ",
    "acceptedJobs": {
        "output": {
            "destination": {
                "region": "emea"
            },
            "formats": [
                {
                    "type": "svf2",
                    "views": [
                        "2d",
                        "3d"
                    ]
                }
            ]
        }
    }
}
```

```json
{
    "type": "manifest",
    "hasThumbnail": "true",
    "status": "success",
    "progress": "complete",
    "region": "EMEA",
    "urn": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ",
    "version": "1.0",
    "derivatives": [
        {
            "name": "Snowdon Towers Sample Structural.ifc",
            "hasThumbnail": "true",
            "status": "success",
            "progress": "complete",
            "properties": {
                "Document Information": {
                    "Navisworks File Creator": "LcNwcLoaderPlugin:lcldifc",
                    "IFC Loader": "1",
                    "nwModelToWorldTransform": [
                        1,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0
                    ]
                }
            },
            "outputType": "svf2",
            "children": [
                {
                    "guid": "4ea90c85-b3b6-62b7-a53c-275b84808947",
                    "type": "geometry",
                    "role": "3d",
                    "name": "Snowdon Towers Sample Structural.ifc",
                    "status": "success",
                    "viewableID": "Snowdon Towers Sample Structural.ifc",
                    "hasThumbnail": "true",
                    "progress": "complete",
                    "useAsDefault": true,
                    "children": [
                        {
                            "guid": "c5538117-f224-4ac3-874d-de65a1554490",
                            "type": "view",
                            "role": "3d",
                            "name": "Default",
                            "status": "success",
                            "hasThumbnail": "true",
                            "camera": [
                                417612.4375,
                                78695.3984375,
                                323.46966552734375,
                                417612.4375,
                                78695.3984375,
                                245.73223876953125,
                                0,
                                1,
                                0,
                                1,
                                0.785398006439209,
                                1,
                                0
                            ],
                            "useAsDefault": true,
                            "children": [
                                {
                                    "guid": "91c32a85-cf29-4682-bd77-42166b604831",
                                    "type": "resource",
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ/output/0/0_100.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "resolution": [
                                        100,
                                        100
                                    ]
                                },
                                {
                                    "guid": "bd66cd98-7d0b-4a8f-9291-bd1774a41ca2",
                                    "type": "resource",
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ/output/0/0_200.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "resolution": [
                                        200,
                                        200
                                    ]
                                },
                                {
                                    "guid": "15592aea-0984-41ff-910c-cfb0238c1f44",
                                    "type": "resource",
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ/output/0/0_400.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "resolution": [
                                        400,
                                        400
                                    ]
                                }
                            ]
                        },
                        {
                            "role": "graphics",
                            "mime": "application/autodesk-svf2",
                            "guid": "e08e7f7f-e89b-4d64-a394-88e5d228ccad",
                            "type": "resource"
                        }
                    ]
                },
                {
                    "guid": "f17933c3-3395-467b-b306-b8fd8918e3a4",
                    "type": "resource",
                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YmltNDItYXV0b2Rlc2stdmlld2VyL2Fwc2JvdDdlNWNmZmQ2LTk3YzItNDBmNy1hYTFhLTJlOGRhYzIyNDc5OQ/output/0/properties.db",
                    "role": "Autodesk.CloudPlatform.PropertyDatabase",
                    "mime": "application/autodesk-db",
                    "status": "success"
                }
            ]
        }
    ]
}
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
