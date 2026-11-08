import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wine({ size = 24, ...props }: IconProps) {
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
      <path d="M15.946 1C16.368 1 16.745 1.26 16.888 1.66L19.669 9.42L19.742 9.64C20.455 11.92 19.68 14.42 17.775 15.87C16.809 16.6 15.63 17 14.418 17H13.004V21H15.961V23H8.047V21H11.004V17H9.59C8.378 17 7.199 16.6 6.232 15.87C4.267 14.37 3.503 11.75 4.339 9.42L7.148 1.59C7.321 1.27 7.692 1 8.062 1H15.946Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 16H14.414C15.406 16 16.372 15.67 17.165 15.07C18.781 13.84 19.414 11.68 18.724 9.76L15.943 2H8.057L5.276 9.76C4.586 11.68 5.219 13.84 6.834 15.07C7.628 15.67 8.593 16 9.586 16H12ZM12 16V22M12 22H8.043M12 22H15.957M5.548 9H6.084C6.861 9 7.617 8.87 8.238 8.64C8.86 8.4 9.616 8.28 10.393 8.28C11.169 8.28 11.926 8.4 12.547 8.64C13.168 8.87 13.924 9 14.701 9C16.061 9 17.304 8.61 17.913 8L18.045 7.87"/>
    </svg>
  )
}
