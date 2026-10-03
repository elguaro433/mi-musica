# Mete PrivacyInfo.xcprivacy en el proyecto de Xcode (Apple lo exige desde 2024 para subir a la App Store).
# Uso: ruby anadir_privacidad.rb <carpeta native>
require 'fileutils'
require 'xcodeproj'

base = ARGV[0]
destino = File.join(base, 'ios/App/App/PrivacyInfo.xcprivacy')
FileUtils.cp(File.join(base, 'PrivacyInfo.xcprivacy'), destino)

proyecto = Xcodeproj::Project.open(File.join(base, 'ios/App/App.xcodeproj'))
objetivo = proyecto.targets.find { |t| t.name == 'App' }
grupo = proyecto.main_group.find_subpath('App', true)
unless grupo.files.any? { |f| f.path == 'PrivacyInfo.xcprivacy' }
  ref = grupo.new_file('PrivacyInfo.xcprivacy')
  objetivo.resources_build_phase.add_file_reference(ref)
  proyecto.save
end
puts 'PrivacyInfo.xcprivacy añadido'
