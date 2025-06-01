/*
 * @Author: ustinian-wang wangjser@gmail.com
 * @Date: 2024-12-24 00:59:18
 * @LastEditors: ustinian-wang wangjser@gmail.com
 * @LastEditTime: 2024-12-24 01:00:02
 * @FilePath: \kit\__tests__\aop.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: ustinian-wang wangjser@gmail.com
 * @Date: 2024-12-24 00:59:18
 * @LastEditors: ustinian-wang wangjser@gmail.com
 * @LastEditTime: 2024-12-24 00:59:42
 * @FilePath: \kit\__tests__\aop.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { asyncRetry } from '../src/utils/aop';

describe('asyncRetry', () => {
    it('should return result when function succeeds on first try', async () => {
        const successFunc = jest.fn().mockResolvedValue('success');
        const retryFunc = asyncRetry(successFunc, 3);
        
        const result = await retryFunc('test');
        
        expect(result).toBe('success');
        expect(successFunc).toHaveBeenCalledTimes(1);
        expect(successFunc).toHaveBeenCalledWith('test');
    });

    it.skip('should retry specified times and throw error when all attempts fail', async () => {
        const error = new Error('test error');
        const failFunc = jest.fn().mockRejectedValue(error);
        const retryFunc = asyncRetry(failFunc, 3);
        
        const consoleSpy = jest.spyOn(console, 'log');
        
        await retryFunc('test');
        
        expect(failFunc).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenNthCalledWith(1, 'retry 0 times');
        expect(consoleSpy).toHaveBeenNthCalledWith(2, 'retry 1 times');
        expect(consoleSpy).toHaveBeenNthCalledWith(3, 'retry 2 times');
        
        consoleSpy.mockRestore();
    });

    it.skip('should succeed after some retries', async () => {
        let attempts = 0;
        const eventuallySuccessFunc = jest.fn().mockImplementation(() => {
            if (attempts++ < 2) {
                return Promise.reject(new Error('temp error'));
            }
            return Promise.resolve('success');
        });
        
        const retryFunc = asyncRetry(eventuallySuccessFunc, 3);
        const consoleSpy = jest.spyOn(console, 'log');
        
        const result = await retryFunc('test');
        
        expect(result).toBe('success');
        expect(eventuallySuccessFunc).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        
        consoleSpy.mockRestore();
    });

    it.skip('should use default retry times (3) when not specified', async () => {
        const failFunc = jest.fn().mockRejectedValue(new Error('error'));
        const retryFunc = asyncRetry(failFunc);
        
        const consoleSpy = jest.spyOn(console, 'log');
        
        await retryFunc();
        
        expect(failFunc).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledTimes(3);
        
        consoleSpy.mockRestore();
    });
}); 