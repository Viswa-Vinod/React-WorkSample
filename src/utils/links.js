export default class Links {   

    static computeLinkString = function(link) {
        return '/' + link.toLowerCase().replace(' ', '-')
    } 
    static computeLinkObject = function(linkObj) {
        const { menu, subMenu }  = linkObj;

        return '/' + menu.toLowerCase().replace(' ', '-') + '/' + subMenu.toLowerCase();
    } 

    static computeTitle = path => {
        let title = '', strAfterSlash = '';
        if (path.endsWith('/')) {
            path = path.substring(0, path.length-1);
        }

        if (path[0] === '/') path = path.substring(1);

        if(path.match(/[/]{1}/)) {
            const indexOfSecondSlash = path.indexOf('/');
            strAfterSlash = path.substring(indexOfSecondSlash + 1);            
        }        
        else {
            strAfterSlash = path;            
        }

        console.log({strAfterSlash});
        if (!strAfterSlash) return 'Push Notifications';
        title = strAfterSlash.replace("-", " ").split(" ")
                .map(str => str[0].toUpperCase() + str.substring(1)).join(" ");
        return title 
    }
}