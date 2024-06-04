frappe.ui.form.on('main', {
    before_save(frm) {
        frm.doc.length=frm.doc.t1.length||frm.doc.t2.length;
        if (!frm.doc.t2) {
            frm.doc.t2 = [];
        }
        if (!frm.doc.t1) {
            frm.doc.t1 = [];
        }
    },
});

frappe.ui.form.on('table1', {

    first_name: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't1', 't2');
    },
    last_name: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't1', 't2');
    },
    age: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't1', 't2');
    },
    before_t1_remove: function(frm, cdt, cdn) {
        var target_row_index = locals[cdt][cdn].idx;
        // console.log("Before deletion:", frm.doc.t2);
    console.log(frm.doc.t2.length+" "+target_row_index)
        if (frm.doc.t2 && frm.doc.t2.length >= target_row_index&&target_row_index>0) {
            frm.get_field('t2').grid.grid_rows[target_row_index - 1].remove();
            console.log("After deletion:", frm.doc.t2);
            frm.refresh_field('t2');
        } else {
            console.log("Target row not found in t2:", target_row_index);
        }
    }
});

frappe.ui.form.on('table2', {
    form_render: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't2', 't1');
    },
    first_name: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't2', 't1');
    },
    last_name: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't2', 't1');
    },
    age: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 't2', 't1');
    },
    // t2_remove: function(frm, cdt, cdn) {
    //     remove_sync_tables(frm, cdt, cdn, 't2', 't1');
    // }
    before_t2_remove: function(frm, cdt, cdn) {
        var target_row_index = locals[cdt][cdn].idx;
        // console.log("Before deletion:", frm.doc.t2);
    // console.log(frm.doc.t2.length+" "+target_row_index)
        if (frm.doc.t2 && frm.doc.t2.length >= target_row_index&&target_row_index>0) {
            frm.get_field('t1').grid.grid_rows[target_row_index - 1].remove();
            console.log("After deletion:", frm.doc.t2);
            frm.refresh_field('t1');
        } else {
            console.log("Target row not found in t2:", target_row_index);
        }
    }
});

function sync_tables(frm, cdt, cdn, source_table, target_table) {
    let row = locals[cdt][cdn];
    let target_row;

    if (!frm.doc[target_table]) {
        frm.doc[target_table] = [];
    }

    target_row = frm.doc[target_table].find(d => d.idx === row.idx);

    if (!target_row) {
        target_row = frm.add_child(target_table);
        target_row.idx = row.idx; 
    }

    target_row.first_name = row.first_name;
    target_row.last_name = row.last_name;
    target_row.age = row.age;

    frm.refresh_field(target_table);
}
