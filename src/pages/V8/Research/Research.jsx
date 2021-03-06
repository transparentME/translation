const content = `
  VV8 Research Grant
  V8科研经费
  The V8 Research Grant funds programming languages and software systems research based on V8, JavaScript, and WebAssembly to foster collaboration between V8 and academia.
  V8科研经费会资助基于V8、js和WebAssembly的编程语言和软件系统的研究，以促进V8与学术界的合作。
  The V8 Research Grant is an unrestricted gift of up to 40,000 USD.
  V8科研经费最高可达到40，000美金。
  As an unrestricted gift the grant does not stipulate intellectual property rights.
  申请经费的资格不要求有知识产权。
  To qualify for this grant, the applicant:
  申请人想获得这项补助的要求如下：
  
  must be a leader of a research group at an accredited university anywhere in the world,
  必须是全球范围内任一官方认可的大学的任一研究团队领导之一，
  must nominate one or more outstanding Ph.D. students to work on the proposed project,
  必须有一名或若干名出色的博士生在推荐项目中持续输出，
  must have a V8 team member as a sponsor who initiates together with the applicant the application process,
  必须有一名v8团队保证人，并由他与申请者一起启动申请流程。
  must propose an advancement of V8, JavaScript or WebAssembly which either results in landing code in production V8 or a publication at a top-tier journal or conference.
  必须使代码能落实在V8产品中并对V8、Javascript、WebAssembly有提高，或发表在顶级周刊或探讨会中。
  
  We expect applications to grow organically out of the research community together with V8 team members at Google.
  我们期望科研团队与Google v8团队的成员一起打造这个应用产品。（意译成分多，不够好）
  V8 Research Grants will be given to the researchers and projects that we believe have the highest relevance to the ongoing language specification and runtime implementation work in V8.
  V8科研经费将会发给那些我们认为在v8中所使用的语言规范与运行时实现紧密相关联的研究学者与项目。
  The V8 Research Grant is committed to the principles of equality, diversity and inclusivity.
  v8科研经费的去向始终以平等、多样化、包容性为原则。
  We strongly encourage applications and nominations from those from BAME and other minority backgrounds, LGBTQI+ backgrounds, people with disabilities and those who identify as female,
  in order to help address the current under-representation of groups in academia and computer science.
  我们尤其鼓励那些来自于BMAE和其他少数群体背景，LGBTQI+等背景，身患残疾的群体，女性群体所制作的应用软件与提名者，
  以帮助在学术界和计算机科学领域中的少数群体。
`
function Research() {
  return (
    <pre className="Research">
      {content}
    </pre>
  );
}

export default Research;