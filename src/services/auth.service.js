import {baseUrl, axiosInstance} from './API';

class AuthService {
   getLogedInAssociates=()=>{
    const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"))
    return JSON.parse(localStorage.getItem("guardianBlinkers"))
   }
   getStudentDetails(studentAccountId){
    return axiosInstance.get(baseUrl + "/api/v2/accounts/fetchAccountById/" + studentAccountId);
   }
   getStudentTransactions(blinkAccountId,blinkUserId){
      //alert("the Blinker id brought forward is "+blinkAccountId)
      return axiosInstance.get(baseUrl + "/api/v2/transactions/searchTransaction?pageNo=1&pageSize=100&userId="+blinkUserId);
   }
   sendStkPush(data){
      return axiosInstance.post(baseUrl+"/api/v2/wallet/loadByMpesa",data)
   }

   logIn(data){
      return axiosInstance.post(baseUrl+"/api/v2/admin/auth/login-with-usertype",data)
   }

   phoneLogin(data){
      return axiosInstance.post(baseUrl+"/api/v2/admin/auth/login-with-msisdn",data)
   }

   fetchTransactionByTransactionId(transactionId){
      return axiosInstance.post(baseUrl+"/api/v2/transactions/fetchTransactionByTransactionId/"+transactionId)
   }
   getTransactionById(trsansactionId){
      return axiosInstance.post(baseUrl+"/api/v2/transactions/searchTransaction?transactionId/"+trsansactionId)
      //let transactionId=30
      //return axiosInstance.post("https://live.blink.co.ke/api/v2/transactions/searchTransaction?transactionId/"+transactionId)
   }

   getTransactionsByDate(userId,dateFrom,dateTo){
      return axiosInstance.get(baseUrl+"/api/v2/transactions/searchTransaction?userId="+userId+"&fromDateTime="+dateFrom+"&toDateTime="+dateTo)
      //let transactionId=30
      //return axiosInstance.post("https://live.blink.co.ke/api/v2/transactions/searchTransaction?transactionId/"+transactionId)
   }

   getOTP(data){
      return axiosInstance.post(baseUrl+"/api/v2/otp/generateSmsOtp",data)
   }

   changePassword(data){
      return axiosInstance.post(baseUrl+"/api/v2/accounts/changePassword",data)
   }

   newCardLimit(data){
      return axiosInstance.post(baseUrl+"/api/v2/blinkerAccountLimits/addBlinkAccountLimit",data)
   }

   inactivateLimit(data){
      return axiosInstance.post(baseUrl+"/api/v2/blinkerAccountLimits/updateBlinkAccountLimit",data)
   }

   deactivateCard(data){
      return axiosInstance.post(baseUrl+"/api/v2/accounts/deactivateCard",data)
   }
   reactivateCard(data){
      return axiosInstance.post(baseUrl+"/api/v2/accounts/reactivateCard",data)
   }

   //edit account
   editBlinkAccount(data){
      return axiosInstance.post(baseUrl+"/api/v2/accounts/editAccount",data)
   }

   //deactivate accounts two
   changeAccountStatus(userId,statusUpdate){
      return axiosInstance.get(baseUrl+"/api/v2/accounts/deactivateAccount/"+userId+"/"+statusUpdate)

     // return axiosInstance.get(baseUrl+"/api/v2/accounts/deactivateAccount/1300/Disabled")
   }

   getAccountByPhoneNum(phoneNum){
      return axiosInstance.get(baseUrl+"/api/v2/accounts/searchUserAccounts?msisdn="+phoneNum)
   }

   //getting account limits
   getAccountLimits(accountId){
      return axiosInstance.get(baseUrl+"/api/v2/blinkerAccountLimits/getAccountLimits/"+accountId)
   }

   //Fund transfer
   fundTransfer(data){
      return axiosInstance.post(baseUrl+"/api/v2/payments/blinkMpesaCallBack"+data)
   }

   //getting system users
   getBlinkUsers(userType,pageSize){
      return axiosInstance.get(baseUrl+"/api/v2/accounts/searchUserAccounts?pageSize="+pageSize+"&userType="+userType)
   }

   //editing mpesa transaction
   editMpesaTransaction(data){
      return axiosInstance.post(baseUrl+"/api/v2/payments/blinkMpesaCallBack",data)
   }

    //Editing MPESA transactions second API
    editMpesaTransaction2(data){
      return axiosInstance.post(baseUrl+"/api/v2/payments/correctPayment",data)
   }



   //getting institutions
   getInstitutions(){
      return axiosInstance.get(baseUrl+"/api/v2/institutions/getInstitutionsSummaryData")
   }

   //get all transactions
   getTransactionsByDate(startDate,endDate,pageSize,pageNo,transType,userType){
      //alert("the Blinker id brought forward is "+blinkAccountId)
      return axiosInstance.get(baseUrl + "/api/v2/transactions/searchTransaction?pageNo="+pageNo+"&pageSize="+pageSize+"&fromDateTime="+startDate+"&toDateTime="+endDate+"&transType="+transType+"&userType="+userType);
   }



}

export default new AuthService();