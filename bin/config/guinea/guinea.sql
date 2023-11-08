-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema whereLocate
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema whereLocate
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `whereLocate` DEFAULT CHARACTER SET utf8 ;
USE `whereLocate` ;

-- -----------------------------------------------------
-- Table `whereLocate`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `whereLocate`.`region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomRegion` VARCHAR(45) NULL DEFAULT NULL,
  `population` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `whereLocate`.`ville`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `whereLocate`.`ville` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomVille` VARCHAR(255) NULL DEFAULT NULL,
  `population` VARCHAR(255) NULL DEFAULT NULL,
  `region_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ville_region_idx` (`region_id` ASC) VISIBLE,
  CONSTRAINT `fk_ville_region`
    FOREIGN KEY (`region_id`)
    REFERENCES `whereLocate`.`region` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `whereLocate`.`sousPrefecture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `whereLocate`.`sousPrefecture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomSousPrecture` VARCHAR(255) NULL DEFAULT NULL,
  `population` VARCHAR(45) NULL DEFAULT NULL,
  `ville_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sousPrefecture_ville1_idx` (`ville_id` ASC) VISIBLE,
  CONSTRAINT `fk_sousPrefecture_ville1`
    FOREIGN KEY (`ville_id`)
    REFERENCES `whereLocate`.`ville` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
