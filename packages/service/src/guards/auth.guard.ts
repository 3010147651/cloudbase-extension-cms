import config from '@/config'
import { Collection, SYSTEM_ROLE_IDS } from '@/constants'
import { getCloudBaseApp, getUserFromCredential, isDevEnv, isRunInServerMode } from '@/utils'
import cloudbase from '@cloudbase/node-sdk'
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

// 校验用户是否登录，是否存在
@Injectable()
export class GlobalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>()

    if (isDevEnv()) {
      request.cmsUser = {
        _id: 'test',
        roles: [SYSTEM_ROLE_IDS.ADMIN],
        username: 'admin',
        createTime: 2020,
        isAdmin: true,
        uuid: 'xxx',
      }

      // request.cmsUser = {
      //     _id: 'test',
      //     roles: [SYSTEM_ROLE_IDS.ADMIN],
      //     username: 'admin',
      //     createTime: 2020,
      //     uuid: 'xxx'
      // }

      // request.cmsUser = {
      //   _id: 'test',
      //   roles: [SYSTEM_ROLE_IDS.CONTENT_ADMIN],
      //   username: '_anonymous',
      //   createTime: 2020,
      //   uuid: 'xxx',
      // }

      return true
    }

    // 获取用户信息
    // 在云函数中获取用户身份信息
    const app = getCloudBaseApp()
    const { TCB_UUID } = cloudbase.getCloudbaseContext()
    let { userInfo } = await app.auth().getEndUserInfo(TCB_UUID)

    // 根据 credential 信息获取用户身份
    if (request.path === `${config.globalPrefix}/upload` || isRunInServerMode()) {
      const { headers } = request
      const credentials = headers['x-cloudbase-credentials'] as string
      if (credentials) {
        const user = await getUserFromCredential(credentials, headers['origin'])
        if (user) {
          userInfo = user
        }
      }
    }

    // 未登录用户
    if (!userInfo?.username && !userInfo?.openId) {
      throw new HttpException(
        {
          code: 'NO_AUTH',
          message: '未登录用户',
        },
        HttpStatus.FORBIDDEN
      )
    }

    const {
      data: [userRecord],
    } = await app
      .database()
      .collection(Collection.Users)
      .where({
        username: userInfo.username,
      })
      .get()

    // 用户信息不存在
    if (!userRecord) {
      throw new HttpException(
        {
          error: {
            code: 'AUTH_EXPIRED',
            message: '用户不存在，请确认登录信息！',
          },
        },
        HttpStatus.FORBIDDEN
      )
    }

    request.cmsUser = userRecord

    return true
  }
}
