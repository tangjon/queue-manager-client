import {TestBed, inject, async} from '@angular/core/testing';
import {LogService} from "./log.service";
import {CoreModule} from "./core.module";
import {User} from "../shared/model/user";


describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [LogService]
    });
  });
  //
  it('should be created', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));

  it('#getLogs should return all entry logs', async(inject([LogService], (service: LogService) => {
    service.getLogs().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    });
  })));

  // it('#addLog should add a log', async(inject([LogService], (service: LogService) => {
  //   service.addLog(user,"Availability Changed", "Bob(i1232) : 0 to 1 in NW");
  // })));


});
