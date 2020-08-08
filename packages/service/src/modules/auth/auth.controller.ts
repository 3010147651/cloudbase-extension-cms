import { Controller, Post, Body } from '@nestjs/common'
import { genPassword, getFullDate } from '@/utils'
import { CloudBaseService } from '@/dynamic_modules'
import { CollectionV2 } from '@/constants'

@Controller('auth')
export class AuthController {
    constructor(private readonly cloudbaseService: CloudBaseService) {}

    @Post('login')
    async login(@Body() body) {
        const { username, password } = body

        if (!username || !password) {
            return {
                message: '用户名或者密码不能为空',
                code: 'LOGIN_WRONG_INPUT',
            }
        }

        // 查询用户信息
        const collection = this.cloudbaseService.collection(CollectionV2.Users)

        const query = collection.where({
            username,
        })

        const getRes = await query.get()
        const dbRecord = getRes.data[0]

        if (!dbRecord) {
            return {
                message: '用户名或者密码错误',
                code: 'LOGIN_WRONG_INPUT',
            }
        }

        const { password: dbPassword, createTime, failedLogins } = dbRecord

        const todayDate = getFullDate()

        if (failedLogins?.[todayDate] >= 5) {
            return {
                message: '登录失败次数过多，请明日再试',
                code: 'LOGIN_RETRY_TOO_MANY',
            }
        }

        const genPasswordResult = await genPassword(password, createTime)

        // 密码错误
        if (genPasswordResult !== dbPassword) {
            await collection.doc(dbRecord._id).update({
                failedLogins: {
                    [todayDate]: failedLogins ? failedLogins[todayDate] + 1 : 1,
                },
            })

            return {
                message: '用户名或者密码错误',
                code: 'LOGIN_WRONG_INPUT',
            }
        }

        // 生成 ticket，使用用户的 id
        const ticket = this.cloudbaseService.auth().createTicket(dbRecord._id, {
            refresh: 3600 * 1000,
        })

        return {
            ticket,
        }
    }

    @Post('currentUser')
    async getCurrentUser() {
        return {
            avatar: '',
            name: '管理员',
            title: '',
            group: '',
            signature: '',
            userid: '1111',
            access: 'admin',
            unreadCount: 1,
        }
    }
}
