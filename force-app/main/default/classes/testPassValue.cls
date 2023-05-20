public with sharing class testPassValue {
    @AuraEnabled
    public static void testPass(List<testWrapper> msgList) 
    {
        for(testWrapper msg : msgList)
        {
            System.debug('Msg Role: '+msg.role+' Msg Content: '+msg.content);
        }
    }
}