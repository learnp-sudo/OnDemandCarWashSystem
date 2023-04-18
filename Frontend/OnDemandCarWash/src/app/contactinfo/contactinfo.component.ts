import { Component } from '@angular/core';
import { faDotCircle, faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contactinfo',
  templateUrl: './contactinfo.component.html',
  styleUrls: ['./contactinfo.component.css']
})
export class ContactinfoComponent {
  mobile = faPhone;
  dot=faDotCircle;
  envelope = faEnvelope;
  marker = faMapMarkerAlt;

}
