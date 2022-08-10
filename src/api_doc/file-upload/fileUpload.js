/**
 * @swagger
 * /api/v1/file/file-upload:
 *  post:
 *    tags:
 *      - File
 *    name: create
 *    summary: upload file
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: image
 *        type: file
 *        in: formData
 *        description: Upload image
 *      - name: name
 *        type: string
 *        in: formData
 *        description: Image name
 *      - name: description
 *        type: string
 *        in: formData
 *        description: Image description
 *    responses:
 *      201:
 *        description: Image created
 *      500:
 *        description: internal server error
 *      422:
 *        description: validation error
 */
