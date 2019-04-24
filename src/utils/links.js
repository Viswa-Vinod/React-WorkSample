export default class Links {   

    static computeLinkString = function(link) {
        return '/' + link.toLowerCase().replace(' ', '-')
    } 
    static computeLinkObject = function(linkObj) {
        const { menu, subMenu }  = linkObj;

        return '/' + menu.toLowerCase().replace(' ', '-') + '/' + subMenu.toLowerCase();
    } 
}