import frappe

@frappe.whitelist()
def get_stock_data(warehouse, item_code):
    # Ensure the fields are indexed
    frappe.db.sql("""
        ALTER TABLE `tabBin`
        ADD INDEX `idx_warehouse_item_code` (`warehouse`, `item_code`);
    """)
    
    # Query to retrieve stock data using indexing
    stock_data = frappe.db.get_value('Bin', {
        'warehouse': warehouse,
        'item_code': item_code
    }, ['actual_qty', 'reserved_qty', 'ordered_qty'], as_dict=True)
    
    return stock_data