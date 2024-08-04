import React from 'react';
import Header from '../../components/general/header';
import Bigprofile from '../../components/profile/Bigprofile';
import Accountsettings from '../../components/profile/AccountSettings';
import Savedsearch from '../../components/profile/SavedSearch';
import './css/profile.css';
import './css/updateml.css';
import './css/updatepw.css';

const Profilepage = () => {
  return (
    <section id = "profilepage">
      <Bigprofile />
      <div id = "moreinfo">
        <Accountsettings />
        <Savedsearch />
      </div>
    </section>
  );
}

export default Profilepage;