/*
 * Simple Merge
 * Usage: merged_data = simple_merge(data1, data2)
          purged_data = simple_remove(a, keys)

    2015-07-23 - original simple_merge()
    2015-12-06 - added simple_remove()
    2016-03-15 - changed to modular format.
*/
var simple = {
    // 'b' overwrites values same keys in 'a'
    merge : function(a, b) {
        if (b) {
            console.log('merging \'b\'');
            var keys = Object.keys(b);

            for (var i = 0; i < keys.length; i++) {
                a[keys[i]] = b[keys[i]];
            }
        }
        return a;
    },
    // remove all items in 'a' that have 'key' in the list 'keys'
    remove : function(a, keys) {
        var key = '';
        if (keys.length) {
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                if (key) {
                    console.log('removing item with key:\'' + key + '\'');
                    delete a[key]
                }
            }
        }
        return a;
    }
}