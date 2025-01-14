class BaseController {

    handleResponse(res, data) {
      return res.json(data);
    }

    handleError(res, error){
      return res.json({ error: error.message })
    }
  };

module.exports = BaseController;
