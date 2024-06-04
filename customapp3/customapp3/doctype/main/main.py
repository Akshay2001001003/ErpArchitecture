# Copyright (c) 2024, me and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.password import encrypt, decrypt
class main(Document):
    def before_save(self):
        if self.aadhar_no.startswith("gAAAAAAB"):
            aadhar_no_str = str(self.aadhar_no)
            self.aadhar_no = encrypt(self.aadhar_no)

    def validate(self):
        try:
            get(self.name,self.length)
        except Exception as e:
            error_message = f"Failed to set cache value: {str(e)}"
            frappe.log_error(error_message, "Cache Set Error")
            # frappe.throw("An error occurred while setting the cache value. Please try again later.")
            raise

        try:
            cached_value = frappe.cache().get_value(self.name)
            frappe.msgprint(f"Cached Length Value: {cached_value}")
        except Exception as e:
            error_message = f"Failed to get cache value: {str(e)}"
            frappe.log_error(error_message, "Cache Get Error")
            frappe.throw("An error occurred while retrieving the cache value. Please try again later.")

def get(name,length):
     frappe.cache().set_value(name,length)
    #  raise ValueError("err")