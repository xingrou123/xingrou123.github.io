document.addEventListener('DOMContentLoaded', () => {
    // Set default dates
    const today = new Date();
    document.getElementById('invoiceDate').valueAsDate = today;

    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').valueAsDate = dueDate;

    // Core Elements
    const itemsList = document.getElementById('itemsList');
    const addItemBtn = document.getElementById('addItemBtn');
    const addDiscountBtn = document.getElementById('addDiscountBtn');
    const addShippingBtn = document.getElementById('addShippingBtn');
    const taxInput = document.getElementById('taxRate');
    const discountInput = document.getElementById('discountRate');
    const subtotalDisplay = document.getElementById('subtotalDisplay');
    const discountDisplay = document.getElementById('discountDisplay');
    const shippingDisplay = document.getElementById('shippingDisplay');
    const taxDisplay = document.getElementById('taxDisplay');
    const grandTotalDisplay = document.getElementById('grandTotalDisplay');
    const printBtn = document.getElementById('printBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewBtn = document.getElementById('previewBtn');
    const emailBtn = document.getElementById('emailBtn');
    const currencySelector = document.getElementById('currencySelector');
    const templateSelector = document.getElementById('templateSelector');

    // Toolbox elements
    const toolboxPanel = document.getElementById('toolboxPanel');
    const toolboxToggle = document.getElementById('toolboxToggle');
    const resetProperties = document.getElementById('resetProperties');

    // Document Settings
    const documentType = document.getElementById('documentType');
    const invoicePrefix = document.getElementById('invoicePrefix');
    const invoiceNumber = document.getElementById('invoiceNumber');
    const invoiceTitleText = document.getElementById('invoiceTitleText');
    const showDueDate = document.getElementById('showDueDate');
    const dueDateRow = document.getElementById('dueDateRow');

    // Field Visibility
    const showItemCode = document.getElementById('showItemCode');
    const showItemTax = document.getElementById('showItemTax');
    const showQtyColumn = document.getElementById('showQtyColumn');
    const showPriceColumn = document.getElementById('showPriceColumn');
    const showPONumber = document.getElementById('showPONumber');
    const showSalesperson = document.getElementById('showSalesperson');
    const showShipping = document.getElementById('showShipping');
    const showDiscountRow = document.getElementById('showDiscountRow');
    const showTaxRow = document.getElementById('showTaxRow');

    // Watermark
    const enableWatermark = document.getElementById('enableWatermark');
    const watermarkType = document.getElementById('watermarkType');
    const customWatermarkGroup = document.getElementById('customWatermarkGroup');
    const customWatermark = document.getElementById('customWatermark');
    const watermarkColor = document.getElementById('watermarkColor');
    const watermarkOpacity = document.getElementById('watermarkOpacity');
    const watermarkOverlay = document.getElementById('watermarkOverlay');
    const watermarkText = document.getElementById('watermarkText');

    // Typography
    const companyNameSize = document.getElementById('companyNameSize');
    const bodyTextSize = document.getElementById('bodyTextSize');
    const invoiceTitleSize = document.getElementById('invoiceTitleSize');
    const lineHeight = document.getElementById('lineHeight');
    const letterSpacing = document.getElementById('letterSpacing');

    // Colors
    const accentColor = document.getElementById('accentColor');
    const textColor = document.getElementById('textColor');
    const bgColor = document.getElementById('bgColor');
    const paperColor = document.getElementById('paperColor');

    // Spacing
    const paperPadding = document.getElementById('paperPadding');
    const sectionSpacing = document.getElementById('sectionSpacing');
    const tableRowPadding = document.getElementById('tableRowPadding');

    // Border & Effects
    const borderWidth = document.getElementById('borderWidth');
    const borderRadius = document.getElementById('borderRadius');
    const shadowIntensity = document.getElementById('shadowIntensity');
    const borderStyle = document.getElementById('borderStyle');

    // Font
    const fontFamily = document.getElementById('fontFamily');
    const headingWeight = document.getElementById('headingWeight');

    // Table Styling
    const tableHeaderBg = document.getElementById('tableHeaderBg');
    const tableHeaderText = document.getElementById('tableHeaderText');
    const tableAltRow = document.getElementById('tableAltRow');
    const enableAltRows = document.getElementById('enableAltRows');
    const tableBorderStyle = document.getElementById('tableBorderStyle');

    // Currency & Numbers
    const decimalPlaces = document.getElementById('decimalPlaces');
    const taxLabel = document.getElementById('taxLabel');
    const showCurrencySymbol = document.getElementById('showCurrencySymbol');

    // Logo
    const logoInput = document.getElementById('logoInput');
    const logoPreview = document.getElementById('logoPreview');
    const removeLogo = document.getElementById('removeLogo');
    const logoSize = document.getElementById('logoSize');
    const logoPosition = document.getElementById('logoPosition');
    const companyLogoDisplay = document.getElementById('companyLogoDisplay');
    const logoImage = document.getElementById('logoImage');

    // Payment
    const paymentTerms = document.getElementById('paymentTerms');
    const showPaymentInfo = document.getElementById('showPaymentInfo');
    const bankDetailsGroup = document.getElementById('bankDetailsGroup');
    const bankName = document.getElementById('bankName');
    const accountNumber = document.getElementById('accountNumber');
    const routingNumber = document.getElementById('routingNumber');
    const paymentInfoSection = document.getElementById('paymentInfoSection');
    const paymentTermsDisplay = document.getElementById('paymentTermsDisplay');

    // Modals
    const previewModal = document.getElementById('previewModal');
    const emailModal = document.getElementById('emailModal');
    const closePreview = document.getElementById('closePreview');
    const closeEmail = document.getElementById('closeEmail');
    const previewPrint = document.getElementById('previewPrint');
    const cancelEmail = document.getElementById('cancelEmail');
    const sendEmail = document.getElementById('sendEmail');

    // Currencies
    const currencies = {
        USD: { symbol: '$', locale: 'en-US' },
        EUR: { symbol: '€', locale: 'de-DE' },
        GBP: { symbol: '£', locale: 'en-GB' },
        JPY: { symbol: '¥', locale: 'ja-JP' },
        CAD: { symbol: '$', locale: 'en-CA' },
        AUD: { symbol: '$', locale: 'en-AU' },
        CNY: { symbol: '¥', locale: 'zh-CN' },
        INR: { symbol: '₹', locale: 'en-IN' },
        MYR: { symbol: 'RM', locale: 'ms-MY' }
    };

    const themes = ['modern', 'classic', 'corporate', 'creative', 'minimal'];

    const defaultProperties = {
        companyNameSize: 2,
        bodyTextSize: 0.95,
        invoiceTitleSize: 3,
        lineHeight: 1.6,
        letterSpacing: 0,
        accentColor: '#2563eb',
        textColor: '#1e293b',
        bgColor: '#f8fafc',
        paperColor: '#ffffff',
        paperPadding: 4,
        sectionSpacing: 3,
        tableRowPadding: 1,
        borderWidth: 8,
        borderRadius: 12,
        shadowIntensity: 50,
        borderStyle: 'solid',
        fontFamily: "'Outfit', sans-serif",
        headingWeight: '700',
        tableHeaderBg: '#f1f5f9',
        tableHeaderText: '#64748b',
        tableAltRow: '#fafafa',
        logoSize: 80,
        watermarkColor: '#ef4444',
        watermarkOpacity: 15
    };

    const presets = {
        professional: {
            accentColor: '#0f172a',
            textColor: '#1e293b',
            bgColor: '#f8fafc',
            paperColor: '#ffffff',
            borderWidth: 4,
            borderRadius: 8,
            borderStyle: 'solid',
            fontFamily: "'Inter', sans-serif",
            headingWeight: '600',
            tableHeaderBg: '#f1f5f9',
            tableHeaderText: '#475569',
            shadowIntensity: 40
        },
        colorful: {
            accentColor: '#8b5cf6',
            textColor: '#1e1b4b',
            bgColor: '#faf5ff',
            paperColor: '#ffffff',
            borderWidth: 6,
            borderRadius: 16,
            borderStyle: 'solid',
            fontFamily: "'Poppins', sans-serif",
            headingWeight: '700',
            tableHeaderBg: '#ede9fe',
            tableHeaderText: '#6d28d9',
            shadowIntensity: 60
        },
        elegant: {
            accentColor: '#78716c',
            textColor: '#292524',
            bgColor: '#fafaf9',
            paperColor: '#fffbeb',
            borderWidth: 2,
            borderRadius: 0,
            borderStyle: 'double',
            fontFamily: "Georgia, serif",
            headingWeight: '400',
            tableHeaderBg: '#f5f5f4',
            tableHeaderText: '#57534e',
            shadowIntensity: 25
        },
        bold: {
            accentColor: '#dc2626',
            textColor: '#18181b',
            bgColor: '#fafafa',
            paperColor: '#ffffff',
            borderWidth: 10,
            borderRadius: 4,
            borderStyle: 'solid',
            fontFamily: "'Montserrat', sans-serif",
            headingWeight: '800',
            tableHeaderBg: '#fef2f2',
            tableHeaderText: '#b91c1c',
            shadowIntensity: 70
        }
    };

    let currentCurrency = 'USD';
    let currentDecimalPlaces = 2;
    let shippingTotal = 0;

    // Initialize
    addItem();
    updateCurrency();
    applyTheme('modern');
    initializeToolbox();

    // Core Event Listeners
    addItemBtn.addEventListener('click', addItem);
    if (addDiscountBtn) addDiscountBtn.addEventListener('click', addDiscountLine);
    if (addShippingBtn) addShippingBtn.addEventListener('click', addShippingLine);
    taxInput.addEventListener('input', calculateTotals);
    discountInput.addEventListener('input', calculateTotals);
    printBtn.addEventListener('click', () => window.print());
    if (clearBtn) clearBtn.addEventListener('click', clearInvoice);
    if (previewBtn) previewBtn.addEventListener('click', openPreview);
    if (emailBtn) emailBtn.addEventListener('click', openEmailModal);

    currencySelector.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updateCurrency();
        calculateTotals();
    });

    templateSelector.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });

    // Toolbox toggle
    toolboxToggle.addEventListener('click', () => {
        toolboxPanel.classList.toggle('collapsed');
    });

    resetProperties.addEventListener('click', resetToDefaults);

    // Document Settings
    if (documentType) {
        documentType.addEventListener('change', () => {
            if (invoiceTitleText) invoiceTitleText.textContent = documentType.value;
        });
    }

    if (invoicePrefix) {
        invoicePrefix.addEventListener('input', () => {
            const currentNum = invoiceNumber.value.replace(/[^0-9]/g, '') || '001';
            invoiceNumber.value = invoicePrefix.value + currentNum;
        });
    }

    if (showDueDate) {
        showDueDate.addEventListener('change', () => {
            if (dueDateRow) dueDateRow.style.display = showDueDate.checked ? 'flex' : 'none';
        });
    }

    // Field Visibility Listeners
    if (showItemCode) {
        showItemCode.addEventListener('change', () => {
            document.querySelectorAll('.col-code').forEach(el => {
                el.style.display = showItemCode.checked ? '' : 'none';
            });
        });
    }

    if (showItemTax) {
        showItemTax.addEventListener('change', () => {
            document.querySelectorAll('.col-item-tax').forEach(el => {
                el.style.display = showItemTax.checked ? '' : 'none';
            });
        });
    }

    if (showQtyColumn) {
        showQtyColumn.addEventListener('change', () => {
            document.querySelectorAll('.col-qty').forEach(el => {
                el.style.display = showQtyColumn.checked ? '' : 'none';
            });
        });
    }

    if (showPriceColumn) {
        showPriceColumn.addEventListener('change', () => {
            document.querySelectorAll('.col-price').forEach(el => {
                el.style.display = showPriceColumn.checked ? '' : 'none';
            });
        });
    }

    if (showPONumber) {
        showPONumber.addEventListener('change', () => {
            const poRow = document.getElementById('poNumberRow');
            if (poRow) poRow.style.display = showPONumber.checked ? 'flex' : 'none';
        });
    }

    if (showSalesperson) {
        showSalesperson.addEventListener('change', () => {
            const spRow = document.getElementById('salespersonRow');
            if (spRow) spRow.style.display = showSalesperson.checked ? 'flex' : 'none';
        });
    }

    if (showShipping) {
        showShipping.addEventListener('change', () => {
            const shipSection = document.getElementById('shipToSection');
            if (shipSection) shipSection.style.display = showShipping.checked ? 'block' : 'none';
        });
    }

    if (showDiscountRow) {
        showDiscountRow.addEventListener('change', () => {
            const discRow = document.querySelector('.discount-row');
            if (discRow) discRow.style.display = showDiscountRow.checked ? 'flex' : 'none';
        });
    }

    if (showTaxRow) {
        showTaxRow.addEventListener('change', () => {
            const taxRow = document.querySelector('.tax-row');
            if (taxRow) taxRow.style.display = showTaxRow.checked ? 'flex' : 'none';
        });
    }

    // Same as billing checkbox
    const sameAsBilling = document.getElementById('sameAsBilling');
    if (sameAsBilling) {
        sameAsBilling.addEventListener('change', () => {
            if (sameAsBilling.checked) {
                document.getElementById('shipToName').value = document.getElementById('clientName').value;
                document.getElementById('shipToDetails').value = document.getElementById('clientDetails').value;
            }
        });
    }

    // Watermark Listeners
    if (enableWatermark) {
        enableWatermark.addEventListener('change', () => {
            if (watermarkOverlay) watermarkOverlay.style.display = enableWatermark.checked ? 'block' : 'none';
        });
    }

    if (watermarkType) {
        watermarkType.addEventListener('change', () => {
            if (watermarkType.value === 'custom') {
                if (customWatermarkGroup) customWatermarkGroup.style.display = 'block';
                if (watermarkText) watermarkText.textContent = customWatermark.value || 'CUSTOM';
            } else {
                if (customWatermarkGroup) customWatermarkGroup.style.display = 'none';
                if (watermarkText) watermarkText.textContent = watermarkType.value;
            }
        });
    }

    if (customWatermark) {
        customWatermark.addEventListener('input', () => {
            if (watermarkText) watermarkText.textContent = customWatermark.value || 'CUSTOM';
        });
    }

    if (watermarkColor) {
        watermarkColor.addEventListener('input', () => {
            document.documentElement.style.setProperty('--watermark-color', watermarkColor.value);
        });
    }

    if (watermarkOpacity) {
        watermarkOpacity.addEventListener('input', () => {
            document.documentElement.style.setProperty('--watermark-opacity', watermarkOpacity.value / 100);
            document.getElementById('watermarkOpacityVal').textContent = watermarkOpacity.value + '%';
        });
    }

    // Typography Listeners
    if (companyNameSize) {
        companyNameSize.addEventListener('input', () => {
            const val = companyNameSize.value;
            document.getElementById('companyName').style.fontSize = val + 'rem';
            document.getElementById('companyNameSizeVal').textContent = val + 'rem';
        });
    }

    if (bodyTextSize) {
        bodyTextSize.addEventListener('input', () => {
            const val = bodyTextSize.value;
            document.getElementById('companyDetails').style.fontSize = val + 'rem';
            document.getElementById('clientDetails').style.fontSize = val + 'rem';
            document.getElementById('bodyTextSizeVal').textContent = val + 'rem';
        });
    }

    if (invoiceTitleSize) {
        invoiceTitleSize.addEventListener('input', () => {
            const val = invoiceTitleSize.value;
            if (invoiceTitleText) invoiceTitleText.style.fontSize = val + 'rem';
            document.getElementById('invoiceTitleSizeVal').textContent = val + 'rem';
        });
    }

    if (lineHeight) {
        lineHeight.addEventListener('input', () => {
            document.querySelector('.invoice-paper').style.lineHeight = lineHeight.value;
            document.getElementById('lineHeightVal').textContent = lineHeight.value;
        });
    }

    if (letterSpacing) {
        letterSpacing.addEventListener('input', () => {
            document.querySelector('.invoice-paper').style.letterSpacing = letterSpacing.value + 'px';
            document.getElementById('letterSpacingVal').textContent = letterSpacing.value + 'px';
        });
    }

    // Font Family Listeners
    if (fontFamily) {
        fontFamily.addEventListener('change', () => {
            document.querySelector('.invoice-paper').style.fontFamily = fontFamily.value;
        });
    }

    if (headingWeight) {
        headingWeight.addEventListener('change', () => {
            document.getElementById('companyName').style.fontWeight = headingWeight.value;
            if (invoiceTitleText) invoiceTitleText.style.fontWeight = headingWeight.value;
        });
    }

    // Logo Listeners
    if (logoPreview) {
        logoPreview.addEventListener('click', () => logoInput.click());
    }

    if (logoInput) {
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    logoPreview.innerHTML = `<img src="${event.target.result}" alt="Logo">`;
                    logoPreview.classList.add('has-logo');
                    removeLogo.style.display = 'inline-block';
                    logoImage.src = event.target.result;
                    companyLogoDisplay.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removeLogo) {
        removeLogo.addEventListener('click', () => {
            logoInput.value = '';
            logoPreview.innerHTML = '<span class="upload-placeholder">📷 Click to upload logo</span>';
            logoPreview.classList.remove('has-logo');
            removeLogo.style.display = 'none';
            logoImage.src = '';
            companyLogoDisplay.style.display = 'none';
        });
    }

    if (logoSize) {
        logoSize.addEventListener('input', () => {
            logoImage.style.width = logoSize.value + 'px';
            document.getElementById('logoSizeVal').textContent = logoSize.value + 'px';
        });
    }

    if (logoPosition) {
        logoPosition.addEventListener('change', () => {
            const companyHeader = document.querySelector('.company-header');
            companyHeader.classList.remove('logo-left', 'logo-top', 'logo-right');
            companyHeader.classList.add('logo-' + logoPosition.value);
        });
    }

    // Color Listeners
    if (accentColor) {
        accentColor.addEventListener('input', () => {
            document.documentElement.style.setProperty('--primary-color', accentColor.value);
        });
    }

    if (textColor) {
        textColor.addEventListener('input', () => {
            document.documentElement.style.setProperty('--text-primary', textColor.value);
        });
    }

    if (bgColor) {
        bgColor.addEventListener('input', () => {
            document.querySelector('.main-content').style.backgroundColor = bgColor.value;
        });
    }

    if (paperColor) {
        paperColor.addEventListener('input', () => {
            document.querySelector('.invoice-paper').style.backgroundColor = paperColor.value;
        });
    }

    // Table Styling Listeners
    if (tableHeaderBg) {
        tableHeaderBg.addEventListener('input', () => {
            document.documentElement.style.setProperty('--table-header-bg', tableHeaderBg.value);
        });
    }

    if (tableHeaderText) {
        tableHeaderText.addEventListener('input', () => {
            document.documentElement.style.setProperty('--table-header-text', tableHeaderText.value);
        });
    }

    if (tableAltRow) {
        tableAltRow.addEventListener('input', () => {
            if (enableAltRows && enableAltRows.checked) {
                document.documentElement.style.setProperty('--table-alt-row', tableAltRow.value);
            }
        });
    }

    if (enableAltRows) {
        enableAltRows.addEventListener('change', () => {
            document.documentElement.style.setProperty('--table-alt-row', enableAltRows.checked ? tableAltRow.value : 'transparent');
        });
    }

    if (tableBorderStyle) {
        tableBorderStyle.addEventListener('change', () => {
            document.documentElement.style.setProperty('--table-border-style', tableBorderStyle.value);
        });
    }

    // Currency & Numbers Listeners
    if (decimalPlaces) {
        decimalPlaces.addEventListener('change', () => {
            currentDecimalPlaces = parseInt(decimalPlaces.value);
            calculateTotals();
        });
    }

    if (taxLabel) {
        taxLabel.addEventListener('change', () => {
            const taxLabelDisplay = document.getElementById('taxLabelDisplay');
            if (taxLabelDisplay) {
                const taxValue = taxInput.value;
                taxLabelDisplay.innerHTML = `${taxLabel.value} (%) <input type="number" id="taxRate" value="${taxValue}" min="0" step="0.1" class="tax-input">`;
                document.getElementById('taxRate').addEventListener('input', calculateTotals);
            }
        });
    }

    // Spacing Listeners
    if (paperPadding) {
        paperPadding.addEventListener('input', () => {
            document.documentElement.style.setProperty('--paper-padding', paperPadding.value + 'rem');
            document.getElementById('paperPaddingVal').textContent = paperPadding.value + 'rem';
        });
    }

    if (sectionSpacing) {
        sectionSpacing.addEventListener('input', () => {
            document.querySelector('.invoice-top').style.marginBottom = sectionSpacing.value + 'rem';
            document.getElementById('sectionSpacingVal').textContent = sectionSpacing.value + 'rem';
        });
    }

    if (tableRowPadding) {
        tableRowPadding.addEventListener('input', () => {
            document.querySelectorAll('#itemsTable td, #itemsTable th').forEach(cell => {
                cell.style.padding = tableRowPadding.value + 'rem 0.75rem';
            });
            document.getElementById('tableRowPaddingVal').textContent = tableRowPadding.value + 'rem';
        });
    }

    // Border & Effects Listeners
    if (borderWidth) {
        borderWidth.addEventListener('input', () => {
            document.documentElement.style.setProperty('--border-width', borderWidth.value + 'px');
            document.getElementById('borderWidthVal').textContent = borderWidth.value + 'px';
        });
    }

    if (borderRadius) {
        borderRadius.addEventListener('input', () => {
            document.documentElement.style.setProperty('--border-radius', borderRadius.value + 'px');
            document.getElementById('borderRadiusVal').textContent = borderRadius.value + 'px';
        });
    }

    if (shadowIntensity) {
        shadowIntensity.addEventListener('input', () => {
            const val = shadowIntensity.value;
            const opacity = val / 100;
            const shadow = `0 ${10 + opacity * 15}px ${20 + opacity * 30}px -5px rgba(0, 0, 0, ${0.05 + opacity * 0.15})`;
            document.querySelector('.invoice-paper').style.boxShadow = shadow;
            document.getElementById('shadowIntensityVal').textContent = val + '%';
        });
    }

    if (borderStyle) {
        borderStyle.addEventListener('change', () => {
            document.querySelector('.invoice-paper').style.borderTopStyle = borderStyle.value;
        });
    }

    // Payment Details Listeners
    if (showPaymentInfo) {
        showPaymentInfo.addEventListener('change', () => {
            if (bankDetailsGroup) bankDetailsGroup.style.display = showPaymentInfo.checked ? 'flex' : 'none';
            if (paymentInfoSection) paymentInfoSection.style.display = showPaymentInfo.checked ? 'block' : 'none';
        });
    }

    if (paymentTerms) {
        paymentTerms.addEventListener('change', () => {
            const invoiceDateValue = document.getElementById('invoiceDate').valueAsDate || new Date();
            const newDueDate = new Date(invoiceDateValue);

            switch (paymentTerms.value) {
                case 'Net 15': newDueDate.setDate(newDueDate.getDate() + 15); break;
                case 'Net 30': newDueDate.setDate(newDueDate.getDate() + 30); break;
                case 'Net 45': newDueDate.setDate(newDueDate.getDate() + 45); break;
                case 'Net 60': newDueDate.setDate(newDueDate.getDate() + 60); break;
            }

            document.getElementById('dueDate').valueAsDate = newDueDate;
            if (paymentTermsDisplay) paymentTermsDisplay.textContent = paymentTerms.value;
        });
    }

    if (bankName) {
        bankName.addEventListener('input', () => {
            const display = document.getElementById('bankNameDisplay');
            if (display) {
                display.querySelector('span').textContent = bankName.value;
                display.style.display = bankName.value ? 'block' : 'none';
            }
        });
    }

    if (accountNumber) {
        accountNumber.addEventListener('input', () => {
            const display = document.getElementById('accountDisplay');
            if (display) {
                display.querySelector('span').textContent = accountNumber.value;
                display.style.display = accountNumber.value ? 'block' : 'none';
            }
        });
    }

    if (routingNumber) {
        routingNumber.addEventListener('input', () => {
            const display = document.getElementById('routingDisplay');
            if (display) {
                display.querySelector('span').textContent = routingNumber.value;
                display.style.display = routingNumber.value ? 'block' : 'none';
            }
        });
    }

    // Quick Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = presets[btn.dataset.preset];
            if (preset) applyPreset(preset);
        });
    });

    // Notes Tabs
    document.querySelectorAll('.notes-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.notes-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.note-tab-content').forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            tab.classList.add('active');
            const content = document.getElementById(tab.dataset.tab + 'Note');
            if (content) {
                content.classList.add('active');
                content.style.display = 'block';
            }
        });
    });

    // Modal Listeners
    if (closePreview) closePreview.addEventListener('click', () => previewModal.style.display = 'none');
    if (closeEmail) closeEmail.addEventListener('click', () => emailModal.style.display = 'none');
    if (cancelEmail) cancelEmail.addEventListener('click', () => emailModal.style.display = 'none');
    if (previewPrint) previewPrint.addEventListener('click', () => { previewModal.style.display = 'none'; window.print(); });
    if (sendEmail) sendEmail.addEventListener('click', () => {
        const to = document.getElementById('emailTo').value;
        const subject = encodeURIComponent(document.getElementById('emailSubject').value);
        const body = encodeURIComponent(document.getElementById('emailMessage').value +
            '\n\n---\nInvoice Details:\n' +
            'Invoice #: ' + invoiceNumber.value + '\n' +
            'Amount: ' + grandTotalDisplay.textContent + '\n' +
            'Company: ' + document.getElementById('companyName').value);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        emailModal.style.display = 'none';
    });

    // Close modals on overlay click
    if (previewModal) {
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) previewModal.style.display = 'none';
        });
    }
    if (emailModal) {
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) emailModal.style.display = 'none';
        });
    }

    // Functions
    function addItem() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="col-code" style="display:none;"><input type="text" class="grid-input item-code" placeholder="SKU"></td>
            <td class="col-desc"><input type="text" class="grid-input" placeholder="Item Description"></td>
            <td class="col-qty"><input type="number" class="grid-input quantity" value="1" min="1"></td>
            <td class="col-price"><input type="number" class="grid-input price" value="0.00" min="0" step="0.01"></td>
            <td class="col-item-tax" style="display:none;"><input type="number" class="grid-input item-tax" value="0" min="0" step="0.1"></td>
            <td class="col-total">${formatCurrency(0)}</td>
            <td class="col-action no-print"><button class="delete-btn" title="Remove">&times;</button></td>
        `;
        row.querySelectorAll('input').forEach(input => input.addEventListener('input', () => updateRowTotal(row)));
        row.querySelector('.delete-btn').addEventListener('click', () => { if (itemsList.children.length > 1) { row.remove(); calculateTotals(); } });
        itemsList.appendChild(row);
        applyColumnVisibility(row);
    }

    function addDiscountLine() {
        const row = document.createElement('tr');
        row.classList.add('discount-line');
        row.innerHTML = `
            <td class="col-code" style="display:none;"></td>
            <td class="col-desc"><input type="text" class="grid-input" value="Discount" style="color: #d97706;"></td>
            <td class="col-qty"><input type="number" class="grid-input quantity" value="1" min="1"></td>
            <td class="col-price"><input type="number" class="grid-input price" value="-10.00" step="0.01"></td>
            <td class="col-item-tax" style="display:none;"></td>
            <td class="col-total" style="color: #d97706;">${formatCurrency(-10)}</td>
            <td class="col-action no-print"><button class="delete-btn" title="Remove">&times;</button></td>
        `;
        row.querySelectorAll('input').forEach(input => input.addEventListener('input', () => updateRowTotal(row)));
        row.querySelector('.delete-btn').addEventListener('click', () => { row.remove(); calculateTotals(); });
        itemsList.appendChild(row);
        applyColumnVisibility(row);
        calculateTotals();
    }

    function addShippingLine() {
        const row = document.createElement('tr');
        row.classList.add('shipping-line');
        row.innerHTML = `
            <td class="col-code" style="display:none;"></td>
            <td class="col-desc"><input type="text" class="grid-input" value="Shipping & Handling" style="color: #8b5cf6;"></td>
            <td class="col-qty"><input type="number" class="grid-input quantity" value="1" min="1"></td>
            <td class="col-price"><input type="number" class="grid-input price shipping-cost" value="15.00" min="0" step="0.01"></td>
            <td class="col-item-tax" style="display:none;"></td>
            <td class="col-total" style="color: #8b5cf6;">${formatCurrency(15)}</td>
            <td class="col-action no-print"><button class="delete-btn" title="Remove">&times;</button></td>
        `;
        row.querySelectorAll('input').forEach(input => input.addEventListener('input', () => updateRowTotal(row)));
        row.querySelector('.delete-btn').addEventListener('click', () => { row.remove(); updateShippingDisplay(); calculateTotals(); });
        itemsList.appendChild(row);
        applyColumnVisibility(row);
        updateShippingDisplay();
        calculateTotals();
    }

    function applyColumnVisibility(row) {
        if (showItemCode && !showItemCode.checked) row.querySelector('.col-code').style.display = 'none';
        if (showItemTax && !showItemTax.checked) {
            const taxCell = row.querySelector('.col-item-tax');
            if (taxCell) taxCell.style.display = 'none';
        }
        if (showQtyColumn && !showQtyColumn.checked) row.querySelector('.col-qty').style.display = 'none';
        if (showPriceColumn && !showPriceColumn.checked) row.querySelector('.col-price').style.display = 'none';
    }

    function updateShippingDisplay() {
        const shippingRows = document.querySelectorAll('.shipping-line');
        shippingTotal = 0;
        shippingRows.forEach(row => {
            const qty = parseFloat(row.querySelector('.quantity').value) || 0;
            const price = parseFloat(row.querySelector('.price').value) || 0;
            shippingTotal += qty * price;
        });
        if (shippingDisplay) shippingDisplay.textContent = formatCurrency(shippingTotal);
        const shippingRow = document.getElementById('shippingTotalRow');
        if (shippingRow) shippingRow.style.display = shippingTotal > 0 ? 'flex' : 'none';
    }

    function updateRowTotal(row) {
        const qty = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        row.querySelector('.col-total').textContent = formatCurrency(qty * price);
        if (row.classList.contains('shipping-line')) updateShippingDisplay();
        calculateTotals();
    }

    function calculateTotals() {
        let subtotal = 0;
        document.querySelectorAll('#itemsList tr:not(.shipping-line)').forEach(row => {
            const qty = parseFloat(row.querySelector('.quantity').value) || 0;
            const price = parseFloat(row.querySelector('.price').value) || 0;
            subtotal += qty * price;
        });

        const discountRate = parseFloat(discountInput.value) || 0;
        const discountAmount = subtotal * (discountRate / 100);
        const afterDiscount = subtotal - discountAmount;

        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
        const taxAmount = afterDiscount * (taxRate / 100);

        updateShippingDisplay();
        const grandTotal = afterDiscount + taxAmount + shippingTotal;

        subtotalDisplay.textContent = formatCurrency(subtotal);
        if (discountDisplay) discountDisplay.textContent = '-' + formatCurrency(discountAmount);
        if (taxDisplay) taxDisplay.textContent = formatCurrency(taxAmount);
        grandTotalDisplay.textContent = formatCurrency(grandTotal);
    }

    function formatCurrency(amount) {
        const config = currencies[currentCurrency];
        if (!showCurrencySymbol || !showCurrencySymbol.checked) {
            return new Intl.NumberFormat(config.locale, {
                minimumFractionDigits: currentDecimalPlaces,
                maximumFractionDigits: currentDecimalPlaces
            }).format(amount);
        }
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: currentCurrency,
            minimumFractionDigits: currentDecimalPlaces,
            maximumFractionDigits: currentDecimalPlaces
        }).format(amount);
    }

    function clearInvoice() {
        if (!confirm('Clear all invoice data?')) return;
        document.getElementById('companyName').value = 'Your Company Name';
        document.getElementById('companyDetails').value = '123 Business Rd\nCity, Country\nemail@example.com';
        document.getElementById('clientName').value = '';
        document.getElementById('clientDetails').value = '';
        invoiceNumber.value = 'INV-001';
        document.getElementById('invoiceDate').valueAsDate = new Date();
        document.getElementById('dueDate').valueAsDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const poNum = document.getElementById('poNumber');
        if (poNum) poNum.value = '';
        const sp = document.getElementById('salesperson');
        if (sp) sp.value = '';
        while (itemsList.children.length > 0) itemsList.removeChild(itemsList.lastChild);
        addItem();
        discountInput.value = 0;
        taxInput.value = 0;
        calculateTotals();
    }

    function openPreview() {
        if (previewModal) {
            const previewContent = document.getElementById('previewContent');
            const invoicePaper = document.querySelector('.invoice-paper');
            previewContent.innerHTML = invoicePaper.outerHTML;
            previewModal.style.display = 'flex';
        }
    }

    function openEmailModal() {
        if (emailModal) {
            document.getElementById('emailSubject').value = `Invoice ${invoiceNumber.value} from ${document.getElementById('companyName').value}`;
            emailModal.style.display = 'flex';
        }
    }

    function applyPreset(preset) {
        if (accentColor) { accentColor.value = preset.accentColor; document.documentElement.style.setProperty('--primary-color', preset.accentColor); }
        if (textColor) { textColor.value = preset.textColor; document.documentElement.style.setProperty('--text-primary', preset.textColor); }
        if (bgColor) { bgColor.value = preset.bgColor; document.querySelector('.main-content').style.backgroundColor = preset.bgColor; }
        if (paperColor) { paperColor.value = preset.paperColor; document.querySelector('.invoice-paper').style.backgroundColor = preset.paperColor; }
        if (borderWidth) { borderWidth.value = preset.borderWidth; document.documentElement.style.setProperty('--border-width', preset.borderWidth + 'px'); document.getElementById('borderWidthVal').textContent = preset.borderWidth + 'px'; }
        if (borderRadius) { borderRadius.value = preset.borderRadius; document.documentElement.style.setProperty('--border-radius', preset.borderRadius + 'px'); document.getElementById('borderRadiusVal').textContent = preset.borderRadius + 'px'; }
        if (borderStyle) { borderStyle.value = preset.borderStyle; document.querySelector('.invoice-paper').style.borderTopStyle = preset.borderStyle; }
        if (fontFamily) { fontFamily.value = preset.fontFamily; document.querySelector('.invoice-paper').style.fontFamily = preset.fontFamily; }
        if (headingWeight) { headingWeight.value = preset.headingWeight; document.getElementById('companyName').style.fontWeight = preset.headingWeight; if (invoiceTitleText) invoiceTitleText.style.fontWeight = preset.headingWeight; }
        if (tableHeaderBg) { tableHeaderBg.value = preset.tableHeaderBg; document.documentElement.style.setProperty('--table-header-bg', preset.tableHeaderBg); }
        if (tableHeaderText) { tableHeaderText.value = preset.tableHeaderText; document.documentElement.style.setProperty('--table-header-text', preset.tableHeaderText); }
        if (shadowIntensity) {
            shadowIntensity.value = preset.shadowIntensity;
            const opacity = preset.shadowIntensity / 100;
            document.querySelector('.invoice-paper').style.boxShadow = `0 ${10 + opacity * 15}px ${20 + opacity * 30}px -5px rgba(0, 0, 0, ${0.05 + opacity * 0.15})`;
            document.getElementById('shadowIntensityVal').textContent = preset.shadowIntensity + '%';
        }
    }

    function initializeToolbox() {
        if (document.getElementById('companyNameSizeVal')) document.getElementById('companyNameSizeVal').textContent = companyNameSize.value + 'rem';
        if (document.getElementById('bodyTextSizeVal')) document.getElementById('bodyTextSizeVal').textContent = bodyTextSize.value + 'rem';
        if (document.getElementById('invoiceTitleSizeVal')) document.getElementById('invoiceTitleSizeVal').textContent = invoiceTitleSize.value + 'rem';
        if (document.getElementById('lineHeightVal')) document.getElementById('lineHeightVal').textContent = lineHeight.value;
        if (document.getElementById('letterSpacingVal')) document.getElementById('letterSpacingVal').textContent = letterSpacing.value + 'px';
        if (document.getElementById('paperPaddingVal')) document.getElementById('paperPaddingVal').textContent = paperPadding.value + 'rem';
        if (document.getElementById('sectionSpacingVal')) document.getElementById('sectionSpacingVal').textContent = sectionSpacing.value + 'rem';
        if (document.getElementById('tableRowPaddingVal')) document.getElementById('tableRowPaddingVal').textContent = tableRowPadding.value + 'rem';
        if (document.getElementById('borderWidthVal')) document.getElementById('borderWidthVal').textContent = borderWidth.value + 'px';
        if (document.getElementById('borderRadiusVal')) document.getElementById('borderRadiusVal').textContent = borderRadius.value + 'px';
        if (document.getElementById('shadowIntensityVal')) document.getElementById('shadowIntensityVal').textContent = shadowIntensity.value + '%';
        if (document.getElementById('logoSizeVal')) document.getElementById('logoSizeVal').textContent = logoSize.value + 'px';
        if (document.getElementById('watermarkOpacityVal')) document.getElementById('watermarkOpacityVal').textContent = watermarkOpacity.value + '%';

        document.documentElement.style.setProperty('--table-header-bg', tableHeaderBg.value);
        document.documentElement.style.setProperty('--table-header-text', tableHeaderText.value);
        if (enableAltRows && enableAltRows.checked) document.documentElement.style.setProperty('--table-alt-row', tableAltRow.value);
        document.documentElement.style.setProperty('--watermark-color', watermarkColor.value);
        document.documentElement.style.setProperty('--watermark-opacity', watermarkOpacity.value / 100);
    }

    function resetToDefaults() {
        Object.keys(defaultProperties).forEach(key => {
            const el = document.getElementById(key);
            if (el) el.value = defaultProperties[key];
        });
        document.documentElement.style.setProperty('--primary-color', defaultProperties.accentColor);
        document.documentElement.style.setProperty('--text-primary', defaultProperties.textColor);
        document.documentElement.style.setProperty('--border-width', defaultProperties.borderWidth + 'px');
        document.documentElement.style.setProperty('--border-radius', defaultProperties.borderRadius + 'px');
        document.querySelector('.main-content').style.backgroundColor = '';
        document.querySelector('.invoice-paper').style.backgroundColor = '';
        document.querySelector('.invoice-paper').style.fontFamily = '';
        document.querySelector('.invoice-paper').style.boxShadow = '';
        document.querySelector('.invoice-paper').style.borderTopStyle = '';
        initializeToolbox();
    }

    function updateCurrency() { }
    function applyTheme(themeName) {
        themes.forEach(theme => document.body.classList.remove(`theme-${theme}`));
        document.body.classList.add(`theme-${themeName}`);
    }
});
