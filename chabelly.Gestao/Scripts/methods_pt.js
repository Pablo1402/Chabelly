/*
 * Localized default methods for the jQuery validation plugin.
 * Locale: PT_BR
 */
jQuery.extend(jQuery.validator.methods, {
	date: function(value, element) {
		return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
	},
	number: function(value, element) {
		return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
	},
    range: function(value, element, param) {
        return (Globalize.parseFloat(value) >= Globalize.parseFloat(param[0]) && Globalize.parseFloat(value) <= Globalize.parseFloat(param[1]));
	}
});