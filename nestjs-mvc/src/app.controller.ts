import { Controller, Get, Query, Render, Post,  Body,  Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ProdutoDto } from './produto.dto';
import { Response, response } from 'express';
import { Produto } from './produto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('produtos')
  @Render('produtos')
  obterProdutos() {
    const produtos: Produto[] = this.appService.obterProdutos();
    return {produtos};
  }

  @Get('adicionar')
  @Render('form-produto')
  formulario() {
    return
  }

  @Post('form-Produto')
  @Redirect('produtos')
  salvarProduto(@Body() input: ProdutoDto) {
    this.appService.adicionarProduto(input)
  }

  @Get('alternar-status')
  @Redirect('produtos')
  alterarStatus(@Query('id') idProduto: string) {
    this.appService.alternarStatus(idProduto)
    return
  }

  @Get('remover')
  @Redirect('produtos')
  removerProduto(@Query('id') idProduto: string) {
    this.appService.removerProduto(idProduto)
  }

}
