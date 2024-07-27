const FormContainer = ({children}) => {
  return (
      <div className="container mx-auto mt-20">
          <div className="flex justify-center">
              <div className="w-full md:w-1/2 bg-white p-5 shadow-lg rounded-lg">{children}</div>
          </div>
      </div>
  );
}

export default FormContainer
