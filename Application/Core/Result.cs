namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess{get;set;}
        public string error{get;set;}
        public T value{get;set;}
        public static Result<T> Success(T value)=>new Result<T>{IsSuccess=true,value=value};
        public static Result<T> Failure(string error)=>new Result<T>{IsSuccess=false,error=error};

    }
}