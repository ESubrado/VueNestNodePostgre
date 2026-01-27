import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

     @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    @Get()
    findAllViaLocation(@Query("location") location: string ) {
        return [{location}];
    }

    //route id params
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(id);
    }

    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        // 
        return this.profilesService.create(createProfileDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string, 
        @Body() updateProfileDto: UpdateProfileDto
    ){
        return this.profilesService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        this.profilesService.delete(id);
    }
}
