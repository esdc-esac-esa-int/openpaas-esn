(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .run(registerDefaultAddressbookDisplayShell);

  function registerDefaultAddressbookDisplayShell(
    contactAddressbookDisplayShellRegistry,
    ContactDefaultAddressbookDisplayShell,
    contactDefaultAddressbookHelper,
    contactAddressbookActionEdit,
    contactAddressbookActionDelete,
    contactAddressbookActionSettings,
    contactAddressbookActionExport
  ) {
    contactAddressbookDisplayShellRegistry.add({
      id: 'linagora.esn.contact',
      priority: 1,
      actions: [
        contactAddressbookActionExport,
        contactAddressbookActionSettings,
        contactAddressbookActionEdit,
        contactAddressbookActionDelete
      ],
      displayShell: ContactDefaultAddressbookDisplayShell,
      matchingFunction: contactDefaultAddressbookHelper.isDefaultAddressbook
    });
  }
})(angular);
