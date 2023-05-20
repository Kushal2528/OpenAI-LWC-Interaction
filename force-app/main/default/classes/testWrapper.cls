public with sharing class testWrapper {
    @AuraEnabled
    public String role{get; set;}
    @AuraEnabled
    public String content{get; set;}
}