import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CameraOff({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5L9.71484 9.71484C8.67982 10.4362 8.00013 11.6383 8 12.999C8 15.2082 9.79082 16.999 12 16.999C13.3611 16.999 14.5618 16.3185 15.2832 15.2832L21 21H2C1.4477 21 1 20.5523 1 20V6C1 5.4477 1.4477 5 2 5H5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 3C15.3147 3.00003 15.6109 3.14862 15.7998 3.40039L17 5H22C22.5523 5 23 5.4477 23 6V19.3428L7.70996 4.05273L8.2002 3.40039C8.38908 3.14862 8.68534 3.00003 9 3H15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.5605 14.5605L13.709 14.04C13.3562 14.6176 12.722 14.999 12 14.999C10.8954 14.999 10 14.1036 10 12.999C10.0001 12.2773 10.3818 11.6438 10.959 11.291L10.4385 10.4385L14.5605 14.5605Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70709 1.70703L22.2929 22.2928"/>
    </svg>
  )
}
