import { Component, OnInit } from '@angular/core';
import makeBIMDataViewer from "@bimdata/viewer";

@Component({
  selector: 'app-bim-data',
  standalone: false,
  templateUrl: './bim-data.component.html',
  styleUrl: './bim-data.component.scss'
})
export class BimDataComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    const bimdataViewer = makeBIMDataViewer({
      api: {
        // demo identifications
        modelIds: [1385762],
        cloudId: 31760,
        projectId: 1407938,
        accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1Ql9OOGk4MnlCUWZkZnVfenByMGIyQ1Rfc21jV21kZDkzSTFQRGJXTkIwIn0.eyJleHAiOjE3NDQ2Nzc3MTgsImlhdCI6MTc0NDY2MzMxOCwianRpIjoiMDg2YWYyMTUtMjFhYy00N2EyLTgwOWUtOGY2NDlhYTcyNGUzIiwiaXNzIjoiaHR0cHM6Ly9pYW0uYmltZGF0YS5pby9hdXRoL3JlYWxtcy9iaW1kYXRhIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI3YTdmOWM4LTNhNjctNGIyNC04ZWJkLTU5MWNkM2I1YjdkMCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZkMzJhMTI5LTY4ODYtNDVjYi1iNzUxLTcxOGFlOGM1MjZkNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9zYWxtb24tZ3Jhc3MtMDc5OThmNjAzLjYuYXp1cmVzdGF0aWNhcHBzLm5ldCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWJpbWRhdGEiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBtb2RlbDpyZWFkIGVtYWlsIG1vZGVsOnRva2VuX21hbmFnZSBtb2RlbDp3cml0ZSBjbG91ZDptYW5hZ2UiLCJjbGllbnRIb3N0IjoiOTAuNzAuNC4xOTkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1mZDMyYTEyOS02ODg2LTQ1Y2ItYjc1MS03MThhZThjNTI2ZDYiLCJjbGllbnRBZGRyZXNzIjoiOTAuNzAuNC4xOTkiLCJjbGllbnRfaWQiOiJmZDMyYTEyOS02ODg2LTQ1Y2ItYjc1MS03MThhZThjNTI2ZDYifQ.hPPGtx96grSrOrqa3IsJedFqBgtWfy3UefHpA7l1MfNZIMp7abjC28GsynTpe8Drmxd9uT8hweUUew5pLM-apkulVr_pAPif7KXMgEpnRO-2Y11zKOGbf2_5z4OCS-g5hdjLMS5rJR1zSdzRYcvFTsP9KSkHx4sdLsls2b2z7hqUIINI93eFkBVOEXMXdTk6J64qx5YDOsYFZac7nFhj0quqzlmYYwcJzYwPxj8HADAhhw_tIaMk4Lu03GPC2Q1p14raRiNVA5bZ1T4nSTp-4Ti0xlJBfRZyZ4mEkT1jzQqVk9pmPvJNs5j3--meQRnnUkLmhhH--yt2cMgYNCFWAw",
      },
    });

    bimdataViewer.mount("#viewer-3d");
  }


}
