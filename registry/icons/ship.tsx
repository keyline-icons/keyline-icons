import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ship({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 11.3L7 7C7 5.8954 7.8954 5 9 5L15 5C16.1046 5 17 5.8954 17 7L17 11.3M12 5L12 3M7.2083 20.6226L6.5521 20C4.6068 18.1541 3.6017 15.268 4.1928 12.6255C6.6256 11.3464 9.2068 10.1362 12 10C14.7932 10.1362 17.3744 11.3464 19.8072 12.6255C20.3892 15.2745 19.3973 18.1502 17.4479 20L17.2447 20.1928M2 20.3479C4.3679 21.6637 7.179 20.7413 9.5 19.8407C11.671 18.7159 14.2704 18.7635 16.4239 19.8595C18.1685 20.6303 20.0809 21.0813 22 20.8551M12 14L12 15" fill="none"/>
    </svg>
  )
}
