import { Component } from '@angular/core';

import {MyworklistsPage} from '../myworklists/myworklists';
import {WorklistapplyPage} from '../worklistapply/worklistapply';
import {MysetsPage} from '../mysets/mysets';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MysetsPage;
  tab2Root = MyworklistsPage;
  tab3Root = WorklistapplyPage;

  constructor() {

  }
}
