export const createMockHandlers = (rest: any) => [
    rest.get('https://api.github.com/users/:user', (req: any, res: any, ctx: any) => {
      const { user } = req.params
   
      return res(
        ctx.status(200),
        ctx.json({
          name: `mocked-${user}`,
          bio: 'mocked-bio',
        }),
      )
    }),
  ]