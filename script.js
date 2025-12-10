// Invoice Creator - Brisk Style JavaScript with Full Button Functionality
document.addEventListener('DOMContentLoaded', function () {
    // ==================== ELEMENTS ====================
    const logoBox = document.getElementById('logoBox');
    const logoInput = document.getElementById('logoInput');
    const logoPlaceholder = document.getElementById('logoPlaceholder');
    const logoImage = document.getElementById('logoImage');
    const addItemBtn = document.getElementById('addItemBtn');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const addShippingBtn = document.getElementById('addShippingBtn');
    const previewBtn = document.getElementById('previewBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const feedbackBtn = document.getElementById('feedbackBtn');
    const addFieldsLink = document.getElementById('addFieldsLink');
    const extraFields = document.getElementById('extraFields');
    const itemsBody = document.getElementById('itemsBody');
    const subtotalDisplay = document.getElementById('subtotalDisplay');
    const totalDisplay = document.getElementById('totalDisplay');

    // Modals
    const previewModal = document.getElementById('previewModal');
    const closePreview = document.getElementById('closePreview');
    const printBtn = document.getElementById('printBtn');
    const previewContent = document.getElementById('previewContent');
    const discountModal = document.getElementById('discountModal');
    const closeDiscount = document.getElementById('closeDiscount');
    const cancelDiscount = document.getElementById('cancelDiscount');
    const applyDiscount = document.getElementById('applyDiscount');

    // Notes tabs
    const tabs = document.querySelectorAll('.tab');
    const noteTextareas = document.querySelectorAll('.note-textarea');

    // Discount state
    let discountType = 'none';
    let discountValue = 0;

    // Currency
    let currencySymbol = 'RM';

    // ==================== INITIALIZE ====================
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;

    // ==================== CUSTOMER MANAGEMENT ====================
    const customerSelect = document.getElementById('customerSelect');

    function loadCustomers() {
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        customerSelect.innerHTML = '<option value="">-- Select Customer --</option>';
        customerSelect.innerHTML += '<option value="new">+ Add New Customer</option>';
        customers.forEach((customer, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = customer.name;
            customerSelect.appendChild(option);
        });
    }

    customerSelect.addEventListener('change', () => {
        const value = customerSelect.value;
        if (value === 'new') {
            addNewCustomer();
        } else if (value !== '') {
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            const customer = customers[parseInt(value)];
            if (customer) {
                document.getElementById('billingAddress').value = customer.address || '';
            }
        }
    });

    // ==================== NEW CUSTOMER MODAL ====================
    const newCustomerModal = document.getElementById('newCustomerModal');
    const closeNewCustomerBtn = document.getElementById('closeNewCustomer');
    const cancelNewCustomerBtn = document.getElementById('cancelNewCustomer');
    const saveCustomerBtn = document.getElementById('saveCustomer');

    function addNewCustomer() {
        console.log('Opening New Customer modal');
        if (newCustomerModal) {
            newCustomerModal.style.display = 'flex';
            // Clear form
            document.getElementById('newCustomerName').value = '';
            document.getElementById('newCustomerEmail').value = '';
            document.getElementById('newCustomerTelephone').value = '';
            document.getElementById('newCustomerContact').value = '';
            document.getElementById('newCustomerBillingAddress').value = '';
            document.getElementById('newCustomerShippingAddress').value = '';
            document.getElementById('customerActive').checked = true;
            document.getElementById('customerPrivateNote').value = '';
            document.getElementById('customerStatementNote').value = '';
            document.getElementById('customerAdditionalInfo').value = '';
            document.getElementById('customerPaymentDays').value = '30';
            document.getElementById('customerTaxExempt').checked = false;
        } else {
            // Fallback to prompt if modal doesn't exist
            const name = prompt('Enter customer name:');
            if (name) {
                const address = prompt('Enter customer billing address:');
                const customers = JSON.parse(localStorage.getItem('customers') || '[]');
                customers.push({ name, address });
                localStorage.setItem('customers', JSON.stringify(customers));
                loadCustomers();
                customerSelect.value = (customers.length - 1).toString();
                document.getElementById('billingAddress').value = address || '';
            }
            customerSelect.value = '';
        }
    }

    if (closeNewCustomerBtn) closeNewCustomerBtn.addEventListener('click', () => { newCustomerModal.style.display = 'none'; customerSelect.value = ''; });
    if (cancelNewCustomerBtn) cancelNewCustomerBtn.addEventListener('click', () => { newCustomerModal.style.display = 'none'; customerSelect.value = ''; });
    if (newCustomerModal) newCustomerModal.addEventListener('click', (e) => {
        if (e.target === newCustomerModal) { newCustomerModal.style.display = 'none'; customerSelect.value = ''; }
    });

    // Customer notes tabs
    document.querySelectorAll('.customer-note-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.customer-note-tab').forEach(t => {
                t.classList.remove('active');
                t.style.background = '#f5f5f5';
            });
            tab.classList.add('active');
            tab.style.background = 'white';

            const privateNote = document.getElementById('customerPrivateNote');
            const statementNote = document.getElementById('customerStatementNote');
            if (tab.dataset.tab === 'private') {
                privateNote.style.display = 'block';
                statementNote.style.display = 'none';
            } else {
                privateNote.style.display = 'none';
                statementNote.style.display = 'block';
            }
        });
    });

    if (saveCustomerBtn) {
        saveCustomerBtn.addEventListener('click', () => {
            const name = document.getElementById('newCustomerName').value;
            if (!name) {
                alert('Please enter a Customer Name!');
                return;
            }

            const newCustomer = {
                name: name,
                email: document.getElementById('newCustomerEmail').value,
                telephone: document.getElementById('newCustomerTelephone').value,
                contact: document.getElementById('newCustomerContact').value,
                billingAddress: document.getElementById('newCustomerBillingAddress').value,
                shippingAddress: document.getElementById('newCustomerShippingAddress').value,
                active: document.getElementById('customerActive').checked,
                privateNote: document.getElementById('customerPrivateNote').value,
                statementNote: document.getElementById('customerStatementNote').value,
                additionalInfo: document.getElementById('customerAdditionalInfo').value,
                paymentType: document.getElementById('customerPaymentType').value,
                paymentDays: document.getElementById('customerPaymentDays').value,
                method: document.getElementById('customerMethod').value,
                taxExempt: document.getElementById('customerTaxExempt').checked
            };

            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            customers.push(newCustomer);
            localStorage.setItem('customers', JSON.stringify(customers));

            loadCustomers();
            customerSelect.value = (customers.length - 1).toString();
            document.getElementById('billingAddress').value = newCustomer.billingAddress || '';

            alert(`Customer "${name}" saved successfully!`);
            newCustomerModal.style.display = 'none';
        });
    }

    // ==================== LOAD DRAFT ====================
    function loadDraft() {
        const draft = localStorage.getItem('invoiceDraft');
        if (draft) {
            const shouldLoad = confirm('A draft invoice was found. Would you like to restore it?');
            if (shouldLoad) {
                const data = JSON.parse(draft);
                document.getElementById('businessName').value = data.businessName || '';
                document.getElementById('businessAddress').value = data.businessAddress || '';
                document.getElementById('invoiceNumber').value = data.invoiceNumber || '10000';
                document.getElementById('invoiceDate').value = data.invoiceDate || today;
                document.getElementById('billingAddress').value = data.billingAddress || '';

                // Restore items
                if (data.items && data.items.length > 0) {
                    itemsBody.innerHTML = '';
                    data.items.forEach(item => {
                        addItem();
                        const lastRow = itemsBody.lastElementChild;
                        if (lastRow) {
                            const qtyInput = lastRow.querySelector('.qty-input');
                            const codeInput = lastRow.querySelector('.code-input');
                            const descInput = lastRow.querySelector('.desc-input');
                            const priceInput = lastRow.querySelector('.price-input');
                            const taxSelect = lastRow.querySelector('.tax-select');

                            if (qtyInput) qtyInput.value = item.qty || 1;
                            if (codeInput) codeInput.value = item.code || '';
                            if (descInput) descInput.value = item.desc || '';
                            if (priceInput) priceInput.value = item.price || 0;
                            if (taxSelect) taxSelect.value = item.tax || 0;

                            updateRowTotal(lastRow);
                        }
                    });
                }

                alert('Draft restored successfully!');
            }
        }
    }

    // ==================== LOGO UPLOAD ====================
    logoBox.addEventListener('click', () => logoInput.click());
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                logoImage.src = e.target.result;
                logoImage.style.display = 'block';
                logoPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // ==================== ADD OTHER INVOICE FIELDS (Modal) ====================
    const fieldNamesModal = document.getElementById('fieldNamesModal');
    const closeFieldNamesBtn = document.getElementById('closeFieldNames');
    const continueCreatingBtn = document.getElementById('continueCreating');
    const invoiceTextSettingsBtn = document.getElementById('invoiceTextSettings');
    const invoiceSettingsBtn = document.getElementById('invoiceSettings');

    addFieldsLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (fieldNamesModal) {
            fieldNamesModal.style.display = 'flex';
        }
    });

    if (closeFieldNamesBtn) closeFieldNamesBtn.addEventListener('click', () => fieldNamesModal.style.display = 'none');
    if (fieldNamesModal) fieldNamesModal.addEventListener('click', (e) => {
        if (e.target === fieldNamesModal) fieldNamesModal.style.display = 'none';
    });

    if (continueCreatingBtn) {
        continueCreatingBtn.addEventListener('click', () => {
            fieldNamesModal.style.display = 'none';
        });
    }

    // ==================== INVOICE TEXT SETTINGS MODAL ====================
    const textSettingsModal = document.getElementById('textSettingsModal');
    const closeTextSettingsBtn = document.getElementById('closeTextSettings');
    const saveTextSettingsBtn = document.getElementById('saveTextSettings');

    if (invoiceTextSettingsBtn) {
        invoiceTextSettingsBtn.addEventListener('click', () => {
            if (textSettingsModal) {
                textSettingsModal.style.display = 'flex';
                fieldNamesModal.style.display = 'none';
            }
        });
    }

    if (closeTextSettingsBtn) closeTextSettingsBtn.addEventListener('click', () => textSettingsModal.style.display = 'none');
    if (textSettingsModal) textSettingsModal.addEventListener('click', (e) => {
        if (e.target === textSettingsModal) textSettingsModal.style.display = 'none';
    });

    // Tab switching for Text Settings
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.settings-tab').forEach(t => {
                t.classList.remove('active');
                t.style.background = '#f5f5f5';
            });
            tab.classList.add('active');
            tab.style.background = 'white';

            const textContent = document.getElementById('textTabContent');
            const attrContent = document.getElementById('attributesTabContent');
            if (tab.dataset.tab === 'text') {
                textContent.style.display = 'block';
                attrContent.style.display = 'none';
            } else {
                textContent.style.display = 'none';
                attrContent.style.display = 'block';
            }
        });
    });

    if (saveTextSettingsBtn) {
        saveTextSettingsBtn.addEventListener('click', () => {
            // Save text settings to localStorage
            const textSettings = {
                invoiceTitle: document.getElementById('txtInvoiceTitle')?.value || 'Invoice',
                dateTitle: document.getElementById('txtDateTitle')?.value || 'Date',
                numberTitle: document.getElementById('txtNumberTitle')?.value || 'Invoice No.',
                dueDateTitle: document.getElementById('txtDueDateTitle')?.value || 'Due Date',
                qtyTitle: document.getElementById('txtQtyTitle')?.value || 'Qty',
                itemCodeTitle: document.getElementById('txtItemCodeTitle')?.value || 'Item Code',
                descTitle: document.getElementById('txtDescTitle')?.value || 'Description',
                unitPriceTitle: document.getElementById('txtUnitPriceTitle')?.value || 'Unit Price',
                taxColTitle: document.getElementById('txtTaxColTitle')?.value || 'Tax',
                totalColTitle: document.getElementById('txtTotalColTitle')?.value || 'Total'
            };
            localStorage.setItem('textSettings', JSON.stringify(textSettings));
            alert('✅ Text Settings saved successfully!');
            textSettingsModal.style.display = 'none';
        });
    }

    // ==================== INVOICE SETTINGS MODAL ====================
    const invoiceSettingsModal = document.getElementById('invoiceSettingsModal');
    const closeInvoiceSettingsBtn = document.getElementById('closeInvoiceSettings');
    const saveInvoiceSettingsBtn = document.getElementById('saveInvoiceSettings');
    const saveInvoiceSettingsTopBtn = document.getElementById('saveInvoiceSettingsTop');

    if (invoiceSettingsBtn) {
        invoiceSettingsBtn.addEventListener('click', () => {
            if (invoiceSettingsModal) {
                invoiceSettingsModal.style.display = 'flex';
                fieldNamesModal.style.display = 'none';
            }
        });
    }

    if (closeInvoiceSettingsBtn) closeInvoiceSettingsBtn.addEventListener('click', () => invoiceSettingsModal.style.display = 'none');
    if (invoiceSettingsModal) invoiceSettingsModal.addEventListener('click', (e) => {
        if (e.target === invoiceSettingsModal) invoiceSettingsModal.style.display = 'none';
    });

    function saveInvoiceSettingsHandler() {
        // Save invoice settings to localStorage
        const invoiceSettings = {
            showItemCode: document.getElementById('setShowItemCode')?.checked || false,
            showDiscount: document.getElementById('setShowDiscount')?.checked || false,
            printDueDate: document.getElementById('setPrintDueDate')?.checked || false,
            numberPrefix: document.getElementById('setNumberPrefix')?.value || '',
            startNumber: document.getElementById('setStartNumber')?.value || '10001',
            gracePeriod: document.getElementById('gracePeriod')?.value || '14',
            autoBcc: document.getElementById('autoBcc')?.checked || false,
            bccEmail: document.getElementById('bccEmail')?.value || ''
        };
        localStorage.setItem('invoiceSettings', JSON.stringify(invoiceSettings));
        alert('✅ Invoice Settings saved successfully!');
        invoiceSettingsModal.style.display = 'none';
    }

    if (saveInvoiceSettingsBtn) saveInvoiceSettingsBtn.addEventListener('click', saveInvoiceSettingsHandler);
    if (saveInvoiceSettingsTopBtn) saveInvoiceSettingsTopBtn.addEventListener('click', saveInvoiceSettingsHandler);

    // Currency change
    const currencySelect = document.getElementById('currency');
    if (currencySelect) {
        currencySelect.addEventListener('change', () => {
            currencySymbol = currencySelect.value;
            calculateTotals();
        });
    }

    // ==================== BUTTON EVENT LISTENERS ====================
    addItemBtn.addEventListener('click', addItem);
    addDiscountBtn.addEventListener('click', openDiscountModal);
    addShippingBtn.addEventListener('click', addShippingRow);
    previewBtn.addEventListener('click', openPreview);
    saveBtn.addEventListener('click', saveAndDownload);
    clearBtn.addEventListener('click', clearInvoice);
    feedbackBtn.addEventListener('click', sendFeedback);

    // ==================== SAVE DROPDOWN ====================
    const saveDropdownBtn = document.getElementById('saveDropdownBtn');
    const saveDropdownMenu = document.getElementById('saveDropdownMenu');

    // Toggle dropdown
    saveDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        saveDropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.save-dropdown')) {
            saveDropdownMenu.classList.remove('show');
        }
    });

    // Handle dropdown menu actions
    saveDropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const action = link.dataset.action;
            saveDropdownMenu.classList.remove('show');
            handleSaveAction(action);
        });
    });

    function handleSaveAction(action) {
        switch (action) {
            case 'create':
                // Create Invoice - save and increment invoice number
                createInvoice();
                break;
            case 'email':
                // Create and Email
                createAndEmail();
                break;
            case 'print':
                // Create and Print
                openPreview();
                setTimeout(() => window.print(), 500);
                break;
            case 'recurring':
                // Create as Recurring
                createRecurringInvoice();
                break;
            case 'draft':
                // Create as Draft
                saveDraft();
                break;
            case 'preview':
                // Create and Preview
                openPreview();
                break;
            case 'payment':
                // Create and Apply Payment
                createAndApplyPayment();
                break;
            case 'download':
                // Save and Download
                saveAndDownload();
                break;
        }
    }

    // ==================== CREATE INVOICE ====================
    function createInvoice() {
        const invoiceData = getInvoiceData();

        // Save to localStorage
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        invoices.push(invoiceData);
        localStorage.setItem('invoices', JSON.stringify(invoices));

        // Increment invoice number for next invoice
        const currentNum = parseInt(document.getElementById('invoiceNumber').value) || 10000;
        document.getElementById('invoiceNumber').value = currentNum + 1;

        alert(`Invoice #${invoiceData.invoiceNumber} created successfully!\n\nSaved to browser storage.`);
    }

    // ==================== CREATE RECURRING INVOICE ====================
    const recurringModal = document.getElementById('recurringModal');
    const closeRecurringBtn = document.getElementById('closeRecurring');
    const cancelRecurringBtn = document.getElementById('cancelRecurring');
    const recordRecurringBtn = document.getElementById('recordRecurring');

    function createRecurringInvoice() {
        if (recurringModal) {
            recurringModal.style.display = 'flex';
            // Set default start date to today
            document.getElementById('recurringStartDate').value = new Date().toISOString().split('T')[0];
        }
    }

    if (closeRecurringBtn) closeRecurringBtn.addEventListener('click', () => recurringModal.style.display = 'none');
    if (cancelRecurringBtn) cancelRecurringBtn.addEventListener('click', () => recurringModal.style.display = 'none');
    if (recurringModal) recurringModal.addEventListener('click', (e) => {
        if (e.target === recurringModal) recurringModal.style.display = 'none';
    });

    if (recordRecurringBtn) {
        recordRecurringBtn.addEventListener('click', () => {
            const startDate = document.getElementById('recurringStartDate').value;
            const interval = document.getElementById('recurringInterval').value;
            const action = document.getElementById('recurringAction').value;
            const updatePrices = document.getElementById('updatePrices').checked;
            const replacePeriod = document.getElementById('replacePeriod').checked;

            const intervalNames = { '1': 'Monthly', '3': '3 Monthly', '6': '6 Monthly', '12': 'Yearly' };

            const invoiceData = getInvoiceData();
            invoiceData.recurring = true;
            invoiceData.startDate = startDate;
            invoiceData.interval = interval;
            invoiceData.intervalName = intervalNames[interval] || '6 Monthly';
            invoiceData.action = action;
            invoiceData.updatePrices = updatePrices;
            invoiceData.replacePeriod = replacePeriod;

            const recurring = JSON.parse(localStorage.getItem('recurringInvoices') || '[]');
            recurring.push(invoiceData);
            localStorage.setItem('recurringInvoices', JSON.stringify(recurring));

            alert(`✅ Recurring invoice recorded successfully!\n\nStart Date: ${startDate}\nInterval: ${intervalNames[interval]}\nAction: ${action}\n\nThis invoice will be generated automatically.`);
            recurringModal.style.display = 'none';
        });
    }

    // ==================== CREATE AND APPLY PAYMENT ====================
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentBtn = document.getElementById('closePayment');
    const cancelPaymentBtn = document.getElementById('cancelPayment');
    const applyPaymentBtn = document.getElementById('applyPaymentBtn');

    function createAndApplyPayment() {
        if (paymentModal) {
            paymentModal.style.display = 'flex';
            // Pre-fill with total amount
            document.getElementById('paymentAmount').value = totalDisplay.textContent;
            document.getElementById('paymentReference').value = '';
        }
    }

    if (closePaymentBtn) closePaymentBtn.addEventListener('click', () => paymentModal.style.display = 'none');
    if (cancelPaymentBtn) cancelPaymentBtn.addEventListener('click', () => paymentModal.style.display = 'none');
    if (paymentModal) paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) paymentModal.style.display = 'none';
    });

    if (applyPaymentBtn) {
        applyPaymentBtn.addEventListener('click', () => {
            const paymentAmountStr = document.getElementById('paymentAmount').value;
            const paymentAmount = parseFloat(paymentAmountStr.replace(/[^0-9.]/g, '')) || 0;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const paymentReference = document.getElementById('paymentReference').value;
            const totalAmount = parseFloat(totalDisplay.textContent.replace(/[^0-9.]/g, '')) || 0;

            const invoiceData = getInvoiceData();
            invoiceData.payment = paymentAmount;
            invoiceData.paymentMethod = paymentMethod;
            invoiceData.paymentReference = paymentReference;
            invoiceData.status = paymentAmount >= totalAmount ? 'Paid' : 'Partial';

            // Save invoice with payment
            const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
            invoices.push(invoiceData);
            localStorage.setItem('invoices', JSON.stringify(invoices));

            // Increment invoice number
            const currentNum = parseInt(document.getElementById('invoiceNumber').value) || 10000;
            document.getElementById('invoiceNumber').value = currentNum + 1;

            const methodNames = { 'cash': 'Cash', 'bank': 'Bank Transfer', 'card': 'Credit Card', 'cheque': 'Cheque' };

            alert(`✅ Payment applied successfully!\n\nAmount: ${currencySymbol}${paymentAmount.toFixed(2)}\nMethod: ${methodNames[paymentMethod]}\nReference: ${paymentReference || 'N/A'}\nStatus: ${invoiceData.status}`);
            paymentModal.style.display = 'none';
        });
    }

    // ==================== GET INVOICE DATA ====================
    function getInvoiceData() {
        return {
            invoiceNumber: document.getElementById('invoiceNumber').value,
            date: document.getElementById('invoiceDate').value,
            businessName: document.getElementById('businessName').value,
            businessAddress: document.getElementById('businessAddress').value,
            billingAddress: document.getElementById('billingAddress').value,
            subtotal: subtotalDisplay.textContent,
            total: totalDisplay.textContent,
            items: Array.from(document.querySelectorAll('#itemsBody tr')).map(row => ({
                qty: row.querySelector('.qty-input')?.value,
                code: row.querySelector('.code-input')?.value,
                desc: row.querySelector('.desc-input')?.value,
                price: row.querySelector('.price-input')?.value,
                tax: row.querySelector('.tax-select')?.value
            })),
            publicNote: document.getElementById('publicNote').value,
            createdAt: new Date().toISOString()
        };
    }

    // ==================== EMAIL MODAL ====================
    const emailModal = document.getElementById('emailModal');
    const closeEmailBtn = document.getElementById('closeEmail');
    const cancelEmailBtn = document.getElementById('cancelEmail');
    const sendEmailBtn = document.getElementById('sendEmail');
    const emailStatus = document.getElementById('emailStatus');

    // Initialize EmailJS with public key (free account)
    // Users can create their own at emailjs.com
    const EMAILJS_PUBLIC_KEY = '7f-DKVQ32wFe9doOo';
    const EMAILJS_SERVICE_ID = 'service_a3ztrop';
    const EMAILJS_TEMPLATE_ID = 'template_pdh5ono';

    function createAndEmail() {
        console.log('Create and Email clicked!');
        // Open email modal
        emailModal.style.display = 'flex';
        emailStatus.textContent = '';
        emailStatus.style.color = '';
    }

    if (closeEmailBtn) closeEmailBtn.addEventListener('click', () => emailModal.style.display = 'none');
    if (cancelEmailBtn) cancelEmailBtn.addEventListener('click', () => emailModal.style.display = 'none');

    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', () => {
            const recipientEmail = document.getElementById('recipientEmail').value;
            const senderEmail = document.getElementById('senderEmail').value;
            const message = document.getElementById('emailMessage').value;

            if (!recipientEmail) {
                emailStatus.textContent = '❌ Please enter recipient email!';
                emailStatus.style.color = 'red';
                return;
            }

            if (!senderEmail) {
                emailStatus.textContent = '❌ Please enter your email!';
                emailStatus.style.color = 'red';
                return;
            }

            // Prepare email content
            const invoiceNum = document.getElementById('invoiceNumber').value || '10000';
            const businessName = document.getElementById('businessName').value || 'Your Company';
            const total = totalDisplay.textContent;

            const emailContent = {
                // Try multiple common variable names for recipient
                to_email: recipientEmail,
                email: recipientEmail,
                user_email: recipientEmail,
                recipient: recipientEmail,
                email_to: recipientEmail,
                to_name: 'Customer',
                from_email: senderEmail,
                from_name: businessName,
                reply_to: senderEmail,
                subject: `Invoice #${invoiceNum} from ${businessName}`,
                message: `${message || 'Please find the invoice details below.'}\n\nInvoice #: ${invoiceNum}\nDate: ${document.getElementById('invoiceDate').value}\nTotal Amount: ${total}\n\nBilling Address:\n${document.getElementById('billingAddress').value}\n\nThank you for your business!`
            };

            console.log('Sending email with:', emailContent);

            emailStatus.textContent = '⏳ Sending email...';
            emailStatus.style.color = 'blue';

            // Check if EmailJS is configured
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                // EmailJS not configured - show instructions
                emailStatus.innerHTML = `
                    <span style="color: orange;">⚠️ EmailJS not configured!</span><br>
                    <small>
                    To send real emails:<br>
                    1. Go to <a href="https://www.emailjs.com" target="_blank">emailjs.com</a> (free)<br>
                    2. Create account and get keys<br>
                    3. Update script.js with your keys<br><br>
                    For now, opening your email client...
                    </small>
                `;

                // Fallback to mailto
                setTimeout(() => {
                    const subject = encodeURIComponent(`Invoice #${invoiceNum} from ${businessName}`);
                    const body = encodeURIComponent(
                        `Dear Customer,\n\n${message || 'Please find the invoice details below.'}\n\n` +
                        `Invoice #: ${invoiceNum}\n` +
                        `Total Amount: ${total}\n\n` +
                        `Thank you for your business.\n\n` +
                        `Best regards,\n${businessName}`
                    );
                    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
                }, 2000);
                return;
            }

            // Send via EmailJS
            try {
                emailjs.init(EMAILJS_PUBLIC_KEY);
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailContent)
                    .then((response) => {
                        console.log('EmailJS SUCCESS:', response);
                        emailStatus.textContent = '✅ Email sent successfully!';
                        emailStatus.style.color = 'green';
                        setTimeout(() => {
                            emailModal.style.display = 'none';
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        emailStatus.innerHTML = `❌ Failed: ${error.text || error.message || 'Unknown error'}<br><small>Check browser console (F12) for details.</small>`;
                        emailStatus.style.color = 'red';
                    });
            } catch (err) {
                console.error('EmailJS Exception:', err);
                emailStatus.textContent = '❌ Error: ' + err.message;
                emailStatus.style.color = 'red';
            }
        });
    }

    function saveDraft() {
        const draftData = {
            businessName: document.getElementById('businessName').value,
            businessAddress: document.getElementById('businessAddress').value,
            invoiceNumber: document.getElementById('invoiceNumber').value,
            invoiceDate: document.getElementById('invoiceDate').value,
            billingAddress: document.getElementById('billingAddress').value,
            items: [],
            savedAt: new Date().toISOString()
        };

        // Save items
        document.querySelectorAll('#itemsBody tr').forEach(row => {
            draftData.items.push({
                qty: row.querySelector('.qty-input')?.value,
                code: row.querySelector('.code-input')?.value,
                desc: row.querySelector('.desc-input')?.value,
                price: row.querySelector('.price-input')?.value,
                tax: row.querySelector('.tax-select')?.value
            });
        });

        localStorage.setItem('invoiceDraft', JSON.stringify(draftData));
        alert('Draft saved successfully!');
    }

    // ==================== MODAL LISTENERS ====================
    // Preview Modal
    closePreview.addEventListener('click', () => previewModal.style.display = 'none');
    printBtn.addEventListener('click', () => window.print());
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) previewModal.style.display = 'none';
    });

    // Discount Modal
    closeDiscount.addEventListener('click', () => discountModal.style.display = 'none');
    cancelDiscount.addEventListener('click', () => discountModal.style.display = 'none');
    discountModal.addEventListener('click', (e) => {
        if (e.target === discountModal) discountModal.style.display = 'none';
    });
    applyDiscount.addEventListener('click', applyDiscountFromModal);

    // ==================== NOTES TABS ====================
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.dataset.tab;
            noteTextareas.forEach(textarea => {
                textarea.style.display = 'none';
            });
            document.getElementById(tabName + 'Note').style.display = 'block';
        });
    });

    // ==================== NEW ITEM MODAL ====================
    const newItemModal = document.getElementById('newItemModal');
    const closeNewItemBtn = document.getElementById('closeNewItem');
    const cancelNewItemBtn = document.getElementById('cancelNewItem');
    const createNewItemBtn = document.getElementById('createNewItem');
    let activeCodeInput = null; // Track which code input was clicked

    // Saved items in localStorage
    function getSavedItems() {
        return JSON.parse(localStorage.getItem('savedItems') || '[]');
    }

    function saveItem(item) {
        const items = getSavedItems();
        items.push(item);
        localStorage.setItem('savedItems', JSON.stringify(items));
    }

    function openNewItemModal(codeInput) {
        activeCodeInput = codeInput;
        newItemModal.style.display = 'flex';
        // Clear form
        document.getElementById('newItemCode').value = '';
        document.getElementById('newItemDescription').value = '';
        document.getElementById('newItemUnitValue').value = 'RM0.00';
        document.getElementById('newItemTax').value = '0';
        document.getElementById('manageInventory').checked = false;
        document.getElementById('currentQuantity').value = '';
        document.getElementById('idealQuantity').value = '';
        document.getElementById('warningQuantity').value = '';
        document.getElementById('newItemNote').value = '';
    }

    if (closeNewItemBtn) closeNewItemBtn.addEventListener('click', () => newItemModal.style.display = 'none');
    if (cancelNewItemBtn) cancelNewItemBtn.addEventListener('click', () => newItemModal.style.display = 'none');
    if (newItemModal) newItemModal.addEventListener('click', (e) => {
        if (e.target === newItemModal) newItemModal.style.display = 'none';
    });

    if (createNewItemBtn) {
        createNewItemBtn.addEventListener('click', () => {
            const itemCode = document.getElementById('newItemCode').value;
            const description = document.getElementById('newItemDescription').value;
            const unitValue = document.getElementById('newItemUnitValue').value.replace(/[^0-9.]/g, '') || '0';
            const tax = document.getElementById('newItemTax').value;

            if (!itemCode) {
                alert('Please enter an Item Code!');
                return;
            }

            // Save item to localStorage
            const newItem = {
                code: itemCode,
                description: description,
                unitValue: parseFloat(unitValue),
                tax: tax,
                manageInventory: document.getElementById('manageInventory').checked,
                currentQuantity: document.getElementById('currentQuantity').value,
                idealQuantity: document.getElementById('idealQuantity').value,
                warningQuantity: document.getElementById('warningQuantity').value,
                note: document.getElementById('newItemNote').value
            };
            saveItem(newItem);

            // Fill in the current row with the new item details
            if (activeCodeInput) {
                const row = activeCodeInput.closest('tr');
                activeCodeInput.value = itemCode;
                row.querySelector('.desc-input').value = description;
                row.querySelector('.price-input').value = parseFloat(unitValue);
                row.querySelector('.tax-select').value = tax;
                updateRowTotal(row);
                calculateTotals();
            }

            alert(`Item "${itemCode}" created successfully!`);
            newItemModal.style.display = 'none';
        });
    }

    // ==================== NEW TAX MODAL ====================
    const newTaxModal = document.getElementById('newTaxModal');
    const closeNewTaxBtn = document.getElementById('closeNewTax');
    const cancelNewTaxBtn = document.getElementById('cancelNewTax');
    const saveTaxBtn = document.getElementById('saveTax');
    let activeTaxSelect = null; // Track which tax select was clicked

    // Get saved taxes from localStorage
    function getSavedTaxes() {
        return JSON.parse(localStorage.getItem('savedTaxes') || '[]');
    }

    // Populate tax dropdowns with saved taxes
    function populateTaxDropdowns() {
        const taxes = getSavedTaxes();
        const taxRate1 = document.getElementById('taxRate1');
        const taxRate2 = document.getElementById('taxRate2');

        if (taxRate1 && taxRate2) {
            // Keep [None] option, add saved taxes
            const options = taxes.map(t => `<option value="${t.rate}">${t.name} (${t.rate}%)</option>`).join('');
            taxRate1.innerHTML = '<option value="">[None]</option>' + options;
            taxRate2.innerHTML = '<option value="">[None]</option>' + options;
        }
    }

    function openNewTaxModal(taxSelect) {
        activeTaxSelect = taxSelect;
        newTaxModal.style.display = 'flex';
        // Clear form
        document.getElementById('newTaxName').value = '';
        document.getElementById('newTaxRate').value = '';
        document.getElementById('taxTypeSimple').checked = true;
        document.getElementById('taxCompounding').checked = false;
        document.getElementById('taxDefault').checked = false;
        document.getElementById('taxShowZero').checked = false;
        populateTaxDropdowns();
    }

    if (closeNewTaxBtn) closeNewTaxBtn.addEventListener('click', () => newTaxModal.style.display = 'none');
    if (cancelNewTaxBtn) cancelNewTaxBtn.addEventListener('click', () => newTaxModal.style.display = 'none');
    if (newTaxModal) newTaxModal.addEventListener('click', (e) => {
        if (e.target === newTaxModal) newTaxModal.style.display = 'none';
    });

    if (saveTaxBtn) {
        saveTaxBtn.addEventListener('click', () => {
            const taxName = document.getElementById('newTaxName').value;
            const taxRate = document.getElementById('newTaxRate').value;
            const isSimple = document.getElementById('taxTypeSimple').checked;

            if (!taxName) {
                alert('Please enter a Tax Name!');
                return;
            }

            if (isSimple && !taxRate) {
                alert('Please enter a Tax Rate!');
                return;
            }

            // Save tax to localStorage
            const newTax = {
                name: taxName,
                rate: parseFloat(taxRate) || 0,
                type: isSimple ? 'simple' : 'combined',
                rate1: document.getElementById('taxRate1').value,
                rate2: document.getElementById('taxRate2').value,
                compounding: document.getElementById('taxCompounding').checked,
                isDefault: document.getElementById('taxDefault').checked,
                showZero: document.getElementById('taxShowZero').checked
            };

            const taxes = getSavedTaxes();
            taxes.push(newTax);
            localStorage.setItem('savedTaxes', JSON.stringify(taxes));

            // Update all tax dropdowns in the invoice with new tax option
            document.querySelectorAll('.tax-select').forEach(select => {
                const option = document.createElement('option');
                option.value = newTax.rate;
                option.textContent = `${newTax.name} (${newTax.rate}%)`;
                select.appendChild(option);
            });

            // Select the new tax in the active dropdown
            if (activeTaxSelect) {
                activeTaxSelect.value = newTax.rate;
                const row = activeTaxSelect.closest('tr');
                if (row) {
                    updateRowTotal(row);
                    calculateTotals();
                }
            }

            alert(`Tax "${taxName}" saved successfully!`);
            newTaxModal.style.display = 'none';
        });
    }

    // ==================== ADD ITEM FUNCTION ====================
    function addItem() {
        const row = document.createElement('tr');

        // Get saved taxes for dropdown
        const savedTaxes = getSavedTaxes();
        const savedTaxOptions = savedTaxes.map(t => `<option value="${t.rate}">${t.name} (${t.rate}%)</option>`).join('');

        row.innerHTML = `
            <td><input type="number" class="qty-input" value="1" min="1"></td>
            <td><input type="text" class="code-input" placeholder="Optional"></td>
            <td><input type="text" class="desc-input" placeholder="Description"></td>
            <td><input type="number" class="price-input" value="0.00" min="0" step="0.01"></td>
            <td>
                <select class="tax-select">
                    <option value="0">[None]</option>
                    <option value="6">6%</option>
                    <option value="10">10%</option>
                    ${savedTaxOptions}
                    <option value="new">+ Add New Tax</option>
                </select>
            </td>
            <td class="line-total">${currencySymbol}0.00</td>
            <td><button class="delete-btn" title="Remove">×</button></td>
        `;

        // Add event listeners
        const qtyInput = row.querySelector('.qty-input');
        const codeInput = row.querySelector('.code-input');
        const priceInput = row.querySelector('.price-input');
        const taxSelect = row.querySelector('.tax-select');
        const deleteBtn = row.querySelector('.delete-btn');

        qtyInput.addEventListener('input', () => updateRowTotal(row));
        priceInput.addEventListener('input', () => updateRowTotal(row));
        taxSelect.addEventListener('change', () => {
            if (taxSelect.value === 'new') {
                openNewTaxModal(taxSelect);
                taxSelect.value = '0'; // Reset to None
            } else {
                updateRowTotal(row);
            }
        });
        deleteBtn.addEventListener('click', () => { row.remove(); calculateTotals(); });

        // Click on code input opens New Item modal
        codeInput.addEventListener('click', () => openNewItemModal(codeInput));

        itemsBody.appendChild(row);
        updateRowTotal(row);
    }

    // ==================== ADD SHIPPING ROW ====================
    function addShippingRow() {
        const row = document.createElement('tr');
        row.classList.add('shipping-row');
        row.innerHTML = `
            <td><input type="number" class="qty-input" value="1" min="1"></td>
            <td></td>
            <td><input type="text" class="desc-input" value="Shipping & Handling" style="color: #8b5cf6;"></td>
            <td><input type="number" class="price-input" value="0.00" min="0" step="0.01"></td>
            <td>
                <select class="tax-select">
                    <option value="0">[None]</option>
                    <option value="6">6%</option>
                </select>
            </td>
            <td class="line-total" style="color: #8b5cf6;">${currencySymbol}0.00</td>
            <td><button class="delete-btn" title="Remove">×</button></td>
        `;

        const qtyInput = row.querySelector('.qty-input');
        const priceInput = row.querySelector('.price-input');
        const taxSelect = row.querySelector('.tax-select');
        const deleteBtn = row.querySelector('.delete-btn');

        qtyInput.addEventListener('input', () => updateRowTotal(row));
        priceInput.addEventListener('input', () => updateRowTotal(row));
        taxSelect.addEventListener('change', () => updateRowTotal(row));
        deleteBtn.addEventListener('click', () => { row.remove(); calculateTotals(); });

        itemsBody.appendChild(row);
        updateRowTotal(row);
    }

    // ==================== UPDATE ROW TOTAL ====================
    function updateRowTotal(row) {
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const price = parseFloat(row.querySelector('.price-input').value) || 0;
        const taxRate = parseFloat(row.querySelector('.tax-select')?.value) || 0;
        const subtotal = qty * price;
        const tax = subtotal * (taxRate / 100);
        const total = subtotal + tax;
        row.querySelector('.line-total').textContent = formatCurrency(total);
        calculateTotals();
    }

    // ==================== CALCULATE TOTALS ====================
    function calculateTotals() {
        let subtotal = 0;
        let grandTotal = 0;

        document.querySelectorAll('#itemsBody tr').forEach(row => {
            const qty = parseFloat(row.querySelector('.qty-input')?.value) || 0;
            const price = parseFloat(row.querySelector('.price-input')?.value) || 0;
            const taxRate = parseFloat(row.querySelector('.tax-select')?.value) || 0;
            const lineSubtotal = qty * price;
            const lineTax = lineSubtotal * (taxRate / 100);
            subtotal += lineSubtotal;
            grandTotal += lineSubtotal + lineTax;
        });

        // Apply discount
        let discountAmount = 0;
        if (discountType === 'flat') {
            discountAmount = discountValue;
        } else if (discountType === 'percent') {
            discountAmount = grandTotal * (discountValue / 100);
        }
        grandTotal = Math.max(0, grandTotal - discountAmount);

        subtotalDisplay.textContent = formatCurrency(subtotal);
        totalDisplay.textContent = formatCurrency(grandTotal);
    }

    // ==================== FORMAT CURRENCY ====================
    function formatCurrency(amount) {
        return currencySymbol + amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // ==================== OPEN DISCOUNT MODAL ====================
    function openDiscountModal() {
        discountModal.style.display = 'flex';
        // Reset values
        document.getElementById('flatDiscount').value = '10.00';
        document.getElementById('percentDiscount').value = '0%';
    }

    // ==================== ADD DISCOUNT ROW ====================
    function addDiscountRow() {
        const row = document.createElement('tr');
        row.classList.add('discount-row');
        row.innerHTML = `
            <td><input type="number" class="qty-input" value="1" min="1"></td>
            <td><input type="text" class="code-input" value="Discount" style="color: #0066cc;"></td>
            <td><input type="text" class="desc-input" value="Discount" style="color: #0066cc;"></td>
            <td><input type="number" class="price-input discount-price" value="-10.00" step="0.01" style="color: #0066cc;"></td>
            <td>
                <select class="tax-select">
                    <option value="0">[None]</option>
                </select>
            </td>
            <td class="line-total" style="color: #0066cc;">-${currencySymbol}10.00</td>
            <td><button class="delete-btn" title="Remove">×</button></td>
        `;

        const qtyInput = row.querySelector('.qty-input');
        const priceInput = row.querySelector('.price-input');
        const taxSelect = row.querySelector('.tax-select');
        const deleteBtn = row.querySelector('.delete-btn');

        qtyInput.addEventListener('input', () => updateDiscountRowTotal(row));
        priceInput.addEventListener('input', () => updateDiscountRowTotal(row));
        taxSelect.addEventListener('change', () => updateDiscountRowTotal(row));
        deleteBtn.addEventListener('click', () => { row.remove(); calculateTotals(); });

        itemsBody.appendChild(row);
        updateDiscountRowTotal(row);
    }

    function updateDiscountRowTotal(row) {
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const price = parseFloat(row.querySelector('.price-input').value) || 0;
        const total = qty * price;
        const lineTotal = row.querySelector('.line-total');

        if (total < 0) {
            lineTotal.textContent = `-${currencySymbol}${Math.abs(total).toFixed(2)}`;
        } else {
            lineTotal.textContent = `${currencySymbol}${total.toFixed(2)}`;
        }
        lineTotal.style.color = '#0066cc';
        calculateTotals();
    }

    function applyDiscountFromModal() {
        const selectedType = document.querySelector('input[name="discountType"]:checked')?.value;

        if (selectedType === 'flat') {
            const discountAmount = parseFloat(document.getElementById('flatDiscount').value) || 0;
            if (discountAmount > 0) {
                // Add a discount row with negative value
                addDiscountRowWithAmount(-discountAmount, 'Flat Discount');
            }
        } else if (selectedType === 'percent') {
            const percentValue = parseFloat(document.getElementById('percentDiscount').value.replace('%', '')) || 0;
            if (percentValue > 0) {
                // Calculate discount based on current subtotal
                const subtotal = parseFloat(subtotalDisplay.textContent.replace(/[^0-9.-]/g, '')) || 0;
                const discountAmount = subtotal * (percentValue / 100);
                addDiscountRowWithAmount(-discountAmount, `${percentValue}% Discount`);
            }
        } else if (selectedType === 'line') {
            // Line-by-line: just close modal and let user add discounts manually
            alert('You can now add discounts to individual line items by entering negative prices.');
        }

        discountModal.style.display = 'none';
        calculateTotals();
    }

    function addDiscountRowWithAmount(amount, description) {
        const row = document.createElement('tr');
        row.classList.add('discount-row');
        row.innerHTML = `
            <td><input type="number" class="qty-input" value="1" min="1"></td>
            <td><input type="text" class="code-input" value="Discount" style="color: #0066cc;"></td>
            <td><input type="text" class="desc-input" value="${description}" style="color: #0066cc;"></td>
            <td><input type="number" class="price-input discount-price" value="${amount.toFixed(2)}" step="0.01" style="color: #0066cc;"></td>
            <td>
                <select class="tax-select">
                    <option value="0">[None]</option>
                </select>
            </td>
            <td class="line-total" style="color: #0066cc;">-${currencySymbol}${Math.abs(amount).toFixed(2)}</td>
            <td><button class="delete-btn" title="Remove">×</button></td>
        `;

        const qtyInput = row.querySelector('.qty-input');
        const priceInput = row.querySelector('.price-input');
        const taxSelect = row.querySelector('.tax-select');
        const deleteBtn = row.querySelector('.delete-btn');

        qtyInput.addEventListener('input', () => updateDiscountRowTotal(row));
        priceInput.addEventListener('input', () => updateDiscountRowTotal(row));
        taxSelect.addEventListener('change', () => updateDiscountRowTotal(row));
        deleteBtn.addEventListener('click', () => { row.remove(); calculateTotals(); });

        itemsBody.appendChild(row);
    }

    // ==================== SEND FEEDBACK ====================
    function sendFeedback() {
        console.log('Send Feedback button clicked!');
        const emailTo = 'feedback@example.com';
        const emailSubject = 'Invoice Creator Feedback';
        const emailBody = 'Hi,\n\nI would like to provide feedback on the Invoice Creator:\n\n(Write your feedback here)';

        // Show feedback preview
        alert(`📧 SEND FEEDBACK\n\nTo: ${emailTo}\nSubject: ${emailSubject}\n\nBody:\n${emailBody}\n\n(Trying to open your email client...)`);

        // Try to open email client
        const subject = encodeURIComponent(emailSubject);
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    }

    // ==================== SAVE AND DOWNLOAD ====================
    function saveAndDownload() {
        openPreview();
        // Wait for preview to render, then trigger print
        setTimeout(() => {
            window.print();
        }, 500);
    }

    // ==================== CLEAR INVOICE ====================
    function clearInvoice() {
        if (confirm('Are you sure you want to clear the invoice? All data will be lost.')) {
            // Reset form fields
            document.getElementById('businessName').value = '';
            document.getElementById('businessAddress').value = '';
            document.getElementById('billingAddress').value = '';
            document.getElementById('invoiceNumber').value = '10000';
            document.getElementById('purchaseOrder').value = '';
            document.getElementById('salesperson').value = '';
            document.getElementById('shippingAddress').value = '';
            document.getElementById('customerSelect').selectedIndex = 0;
            document.getElementById('paymentDays').value = 30;

            // Reset extra fields
            if (document.getElementById('taxId')) document.getElementById('taxId').value = '';
            if (document.getElementById('project')) document.getElementById('project').value = '';

            // Reset logo
            logoImage.style.display = 'none';
            logoImage.src = '';
            logoPlaceholder.style.display = 'block';

            // Clear items
            itemsBody.innerHTML = '';

            // Clear notes
            noteTextareas.forEach(t => t.value = '');

            // Reset discount
            discountType = 'none';
            discountValue = 0;

            // Add initial items
            addItem();
            addItem();
            addItem();
        }
    }

    // ==================== OPEN PREVIEW ====================
    function openPreview() {
        const businessName = document.getElementById('businessName').value || 'Your Company';
        const businessAddress = document.getElementById('businessAddress').value || '';
        const customerName = document.getElementById('customerSelect').options[document.getElementById('customerSelect').selectedIndex]?.text || '';
        const billingAddress = document.getElementById('billingAddress').value || '';
        const invoiceNum = document.getElementById('invoiceNumber').value || '10000';
        const invoiceDateVal = document.getElementById('invoiceDate').value;
        const paymentDays = document.getElementById('paymentDays').value || 30;

        // Calculate due date
        let dueDateStr = '';
        if (invoiceDateVal && paymentDays) {
            const dueDate = new Date(invoiceDateVal);
            dueDate.setDate(dueDate.getDate() + parseInt(paymentDays));
            dueDateStr = dueDate.toISOString().split('T')[0];
        }

        // Build items HTML
        let itemsHtml = '';
        document.querySelectorAll('#itemsBody tr').forEach(row => {
            const qty = row.querySelector('.qty-input')?.value || '';
            const desc = row.querySelector('.desc-input')?.value || '';
            const price = row.querySelector('.price-input')?.value || '0';
            const lineTotal = row.querySelector('.line-total')?.textContent || formatCurrency(0);

            if (qty && desc) {
                itemsHtml += `
                    <tr>
                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">${qty}</td>
                        <td style="border: 1px solid #333; padding: 8px;">${desc}</td>
                        <td style="border: 1px solid #333; padding: 8px; text-align: right;">${formatCurrency(parseFloat(price))}</td>
                        <td style="border: 1px solid #333; padding: 8px; text-align: right;">${lineTotal}</td>
                    </tr>
                `;
            }
        });

        const grandTotal = totalDisplay.textContent;
        const publicNote = document.getElementById('publicNote').value || 'Thank you for your business.';

        // Get logo
        const logoSrc = logoImage.style.display !== 'none' ? logoImage.src : '';

        // Build preview HTML (A4 format matching uploaded image)
        const previewHtml = `
            <div class="preview-a4">
                <h1 style="font-size: 24pt; font-weight: bold; color: #333; margin: 0 0 20px 0;">Invoice</h1>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <div>
                        ${logoSrc ? `<img src="${logoSrc}" style="max-width: 80px; max-height: 60px; margin-bottom: 8px; display: block;">` : ''}
                        <div style="font-size: 11pt; font-weight: bold;">${businessName}</div>
                        <div style="font-size: 10pt; white-space: pre-line;">${businessAddress}</div>
                    </div>
                    <div style="text-align: right; font-size: 10pt;">
                        <div style="margin-bottom: 2px;"><span style="color: #666;">Date:</span> ${invoiceDateVal}</div>
                        <div style="margin-bottom: 2px;"><span style="color: #666;">Invoice No.:</span> ${invoiceNum}</div>
                        ${dueDateStr ? `<div><span style="color: #666;">Due Date:</span> ${dueDateStr}</div>` : ''}
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="font-weight: 600; font-style: italic; font-size: 10pt;">Bill To</div>
                    <div style="font-size: 11pt; font-weight: bold;">${customerName || billingAddress.split('\n')[0] || ''}</div>
                    <div style="font-size: 10pt; white-space: pre-line;">${billingAddress}</div>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 10pt;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #333; padding: 8px; width: 50px; text-align: center; background: white;">Qty</th>
                            <th style="border: 1px solid #333; padding: 8px; text-align: left; background: white;">Description</th>
                            <th style="border: 1px solid #333; padding: 8px; width: 100px; text-align: right; background: white;">Unit Price</th>
                            <th style="border: 1px solid #333; padding: 8px; width: 110px; text-align: right; background: white;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml || ''}
                        <!-- Empty rows to extend the table -->
                        <tr style="height: 350px; vertical-align: top;">
                            <td style="border: 1px solid #333;"></td>
                            <td style="border: 1px solid #333;"></td>
                            <td style="border: 1px solid #333;"></td>
                            <td style="border: 1px solid #333;"></td>
                        </tr>
                    </tbody>
                </table>
                
                <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                    <table style="font-size: 11pt;">
                        <tr>
                            <td style="padding: 4px 20px; text-align: right; font-weight: 500;">Total</td>
                            <td style="text-align: right; font-weight: bold; color: #c9302c; min-width: 120px;">${grandTotal}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 20px; text-align: right; font-weight: 500;">Balance</td>
                            <td style="text-align: right; font-weight: bold; color: #c9302c;">${grandTotal}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="margin-top: 30px;">
                    <span style="font-size: 10pt; color: #c9302c;">${publicNote}</span>
                </div>
            </div>
        `;

        previewContent.innerHTML = previewHtml;
        previewModal.style.display = 'flex';
    }

    // ==================== INITIALIZE WITH DEFAULT ITEMS ====================
    addItem();
    addItem();
    addItem();

    // Load customers from localStorage
    loadCustomers();

    // Load draft if exists (commented out for now to avoid prompt on every load)
    // loadDraft();
});
