Ext.define('MyContacts.controller.Contacts', {
    extend: 'Ext.app.Controller',

    config: {
        models: [
            'Contact'
        ],
        stores: [
            'Contacts'
        ],
        views: [
            'ContactsList',
            'ContactInfo',
            'ContactsPanel',
            'ContactEdit'
        ],

        refs: {
            contactsPanel: {
                autoCreate: true,
                selector: 'contactspanel',
                xtype: 'container'
            },
            contactInfo: {
                selector: 'contactinfo',
                xtype: 'container'
            },
            contactForm: {
                autoCreate: true,
                selector: 'contactedit',
                xtype: 'formpanel'
            }
        },

        control: {
            "contactslist": {
                itemtap: 'onListItemTap'
            },
            "button#back": {
                tap: 'onButtonTapBack'
            },
            "button#cancel": {
                tap: 'onButtonTapCancel'
            },
            "button#add": {
                tap: 'onButtonTapAdd'
            },
            "button#save": {
                tap: 'onButtonTapSave'
            },
            "searchfield": {
                keyup: 'onSearchfieldKeyup',
                clearicontap: 'onSearchfieldClearicontap'
            }
        }
    },

    onButtonTapSave: function(button, e, options) {
        var form = this.getContactForm();

        var values = form.getValues();

        var record = form.getRecord();

        var phantom = record.phantom;

        var store = Ext.getStore('Contacts');
        store.setSyncRemovedRecords(false);

        if (phantom){

            record.setData(values);

            record.setDirty();

            store.add(record);

        } else {

            record = store.getById(record.get('id'));

            record.setData(values);

            record.setDirty();
        }   

        store.sync();

        Ext.Msg.alert('Success', 'The contact was saved successfully!', function(){
            Ext.ComponentQuery.query('contactedit')[0].reset();
            Ext.ComponentQuery.query('contactspanel')[0].setActiveItem(0);
        });
    },

    onButtonTapAdd: function(button, e, options) {
        var panel = this.getContactsPanel();

        panel.animateActiveItem(2, {type: 'slide', direction: 'right'});

        var contact = Ext.create('MyContacts.model.Contact');

        var form = this.getContactForm();
        form.setRecord(contact);
    },

    onButtonTapCancel: function(button, e, options) {
        var form = this.getContactForm();

        var panel = this.getContactsPanel();

        var id = form.getRecord().phantom;

        if (id){
            //this.getContactsPanel().setActiveItem(0);
            panel.animateActiveItem(0, {type: 'slide', direction: 'left'});
        } else {
            //this.getContactsPanel().setActiveItem(1);
            panel.animateActiveItem(1, {type: 'slide', direction: 'left'});
        }   

        form.reset();
    },

    onButtonTapBack: function(button, e, options) {
        //this.getContactsPanel().setActiveItem(0);

        this.getContactsPanel().animateActiveItem(0, {type: 'slide', direction: 'left'});
    },

    onListItemTap: function(dataview, index, target, record, e, options) {
        var panel = this.getContactsPanel();

        panel.setActiveItem(1);

        this.getContactInfo().setRecord(record);
    },

    onSearchfieldKeyup: function(textfield, e, options) {
        var value = textfield.getValue(),
            store = Ext.getStore('Contacts');

        store.clearFilter();

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(' '),
                regexps = [],
                i;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(searches[i], 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('displayName').match(search);

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                //if nothing was found, return false (dont so in the store)
                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    //else true true (show in the store)
                    return matched[0];
                }
            });
        }
    },

    onSearchfieldClearicontap: function(text, e, options) {
        Ext.getStore('Contacts').clearFilter();
    }

});