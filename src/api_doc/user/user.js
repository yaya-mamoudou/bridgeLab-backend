/**
 *  @swagger
 *  /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Users
 *     name: register
 *     summary: creates a user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: profile
 *         type: file
 *         in: formData
 *         description: Upload image for profile picture
 *       - name: username
 *         type: string
 *         in: formData
 *         description: User's username
 *       - name: email
 *         type: string
 *         in: formData
 *         description: User's email
 *       - name: password
 *         type: string
 *         in: formData
 *         description: User password
 *         format: password
 *     responses:
 *       201:
 *         description: Created user successfully
 *       401:
 *         description: User with email already exists
 *       400:
 *         description: Bad request, user not created
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      tags:
 *        - Users
 *      name: user login
 *      summary: logs in a user
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *          required:
 *            - email
 *            - password
 *      responses:
 *        201:
 *          description: successfully logged in
 *        401:
 *          description: credentials don't match
 *        400:
 *          description: user not found
 */
