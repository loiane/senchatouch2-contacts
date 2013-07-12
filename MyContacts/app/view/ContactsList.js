Ext.define('MyContacts.view.ContactsList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.contactslist',

    config: {
        store: 'Contacts',
        grouped: true,
        indexBar: true,
        itemTpl: [
            '<div><b>{givenName}</b> {familyName}</div>'
        ],
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'All Contacts',
                layout: {
                    pack: 'end',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'add',
                        iconCls: 'add',
                        iconMask: true,
                        text: ''
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',
                items: [
                    {
                        xtype: 'searchfield',
                        itemId: 'searchContact',
                        label: '',
                        placeHolder: 'Search'
                    }
                ]
            }
        ]
    }

});