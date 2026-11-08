import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mount({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.001 15.14C19.422 15.14 19.797 15.4 19.941 15.8C20.084 16.19 19.965 16.64 19.643 16.91L12.643 22.77C12.272 23.08 11.731 23.08 11.36 22.77L4.36 16.91C4.037 16.64 3.917 16.2 4.061 15.8C4.204 15.41 4.581 15.14 5.001 15.14L19.001 15.14ZM20.001 13H4.001V11H20.001V13ZM11.359 1.23C11.73 0.92 12.271 0.92 12.642 1.23L19.642 7.09C19.964 7.36 20.083 7.81 19.94 8.2C19.796 8.6 19.421 8.86 19 8.86L5 8.86C4.58 8.86 4.203 8.59 4.06 8.2C3.916 7.8 4.036 7.36 4.359 7.09L11.359 1.23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 12H4M12 2L5 7.86L19 7.86L12 2ZM12 22L5 16.14L19 16.14L12 22Z"/>
    </svg>
  )
}
