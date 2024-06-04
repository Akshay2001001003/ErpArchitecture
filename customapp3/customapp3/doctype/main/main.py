# Copyright (c) 2024, me and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.password import encrypt, decrypt
class main(Document):
    def before_save(self):
        try:
            if not self.aadhar_no.startswith("gAAAAAAB"):
                aadhar_no_str = str(self.aadhar_no)
                self.aadhar_no = encrypt(aadhar_no_str)
        except Exception as e:
            frappe.log_error(message=str(e), title="Error in before_save")
            frappe.throw("An error occurred while encrypting the Aadhar number.")
    
    def validate(self):
        try:
            frappe.cache().set_value(self.name, self.length)
            cached_value = frappe.cache().get_value(self.name)
            frappe.msgprint(f"Cached Length Value: {cached_value}")
        except Exception as e:
            frappe.log_error(message=str(e), title="Error in validate")
            frappe.throw("An error occurred while validating the document.")

    @frappe.whitelist(allow_guest=True)
    def my_method(self, param1, param2):
        # Your method logic
        return f"Received {param1} and {param2}"
