Ext.define('MyContacts.store.Contacts', {
    extend: 'Ext.data.Store',

    requires: [
        'MyContacts.model.Contact'
    ],

    config: {
        autoLoad: true,
        model: 'MyContacts.model.Contact',
        storeId: 'Contacts',
        proxy: {
            type: 'localstorage',
            id: 'phoneContacts'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('givenName')[0];
            }
        }
    }
});