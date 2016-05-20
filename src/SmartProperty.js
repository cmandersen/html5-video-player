function SmartProperty(property, name, options) {
    this.property = property;
    this.name = name;
    this.options = options;
    this.value = options.value || undefined;
    var beforeGet = typeof options.beforeGet == 'function' ? options.beforeGet : function(val) {return val;};
    var beforeSet = typeof options.beforeSet == 'function' ? options.beforeSet : function(val) {return val;};
    var afterSet = typeof options.afterSet == 'function' ? options.afterSet : function(val) {return val;};

    var value = this.value;
    Object.defineProperty(property, name, {
        enumerable: true,
        get : function() {
            var val = beforeGet(value);
            return val;
        },
        set : function(val) {
            val = beforeSet(val);
            value = val;
            afterSet(value);
        }
    });
}