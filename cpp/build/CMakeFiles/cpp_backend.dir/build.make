# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.30

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = "/mnt/sdb1/lancers/travel management app/cpp"

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = "/mnt/sdb1/lancers/travel management app/cpp/build"

# Include any dependencies generated for this target.
include CMakeFiles/cpp_backend.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/cpp_backend.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/cpp_backend.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/cpp_backend.dir/flags.make

CMakeFiles/cpp_backend.dir/src/bindings.cpp.o: CMakeFiles/cpp_backend.dir/flags.make
CMakeFiles/cpp_backend.dir/src/bindings.cpp.o: /mnt/sdb1/lancers/travel\ management\ app/cpp/src/bindings.cpp
CMakeFiles/cpp_backend.dir/src/bindings.cpp.o: CMakeFiles/cpp_backend.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir="/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/cpp_backend.dir/src/bindings.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/cpp_backend.dir/src/bindings.cpp.o -MF CMakeFiles/cpp_backend.dir/src/bindings.cpp.o.d -o CMakeFiles/cpp_backend.dir/src/bindings.cpp.o -c "/mnt/sdb1/lancers/travel management app/cpp/src/bindings.cpp"

CMakeFiles/cpp_backend.dir/src/bindings.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/cpp_backend.dir/src/bindings.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E "/mnt/sdb1/lancers/travel management app/cpp/src/bindings.cpp" > CMakeFiles/cpp_backend.dir/src/bindings.cpp.i

CMakeFiles/cpp_backend.dir/src/bindings.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/cpp_backend.dir/src/bindings.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S "/mnt/sdb1/lancers/travel management app/cpp/src/bindings.cpp" -o CMakeFiles/cpp_backend.dir/src/bindings.cpp.s

# Object files for target cpp_backend
cpp_backend_OBJECTS = \
"CMakeFiles/cpp_backend.dir/src/bindings.cpp.o"

# External object files for target cpp_backend
cpp_backend_EXTERNAL_OBJECTS =

cpp_backend.so: CMakeFiles/cpp_backend.dir/src/bindings.cpp.o
cpp_backend.so: CMakeFiles/cpp_backend.dir/build.make
cpp_backend.so: CMakeFiles/cpp_backend.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir="/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared module cpp_backend.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/cpp_backend.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/cpp_backend.dir/build: cpp_backend.so
.PHONY : CMakeFiles/cpp_backend.dir/build

CMakeFiles/cpp_backend.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/cpp_backend.dir/cmake_clean.cmake
.PHONY : CMakeFiles/cpp_backend.dir/clean

CMakeFiles/cpp_backend.dir/depend:
	cd "/mnt/sdb1/lancers/travel management app/cpp/build" && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" "/mnt/sdb1/lancers/travel management app/cpp" "/mnt/sdb1/lancers/travel management app/cpp" "/mnt/sdb1/lancers/travel management app/cpp/build" "/mnt/sdb1/lancers/travel management app/cpp/build" "/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles/cpp_backend.dir/DependInfo.cmake" "--color=$(COLOR)"
.PHONY : CMakeFiles/cpp_backend.dir/depend

