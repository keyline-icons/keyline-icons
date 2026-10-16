import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Link({ size = 24, ...props }: IconProps) {
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
      <path d="M8.4812 18.1454L8.1883 18.4383C7.5084 19.1181 6.5864 19.5 5.625 19.5C4.6636 19.5 3.7416 19.1181 3.0617 18.4383C2.3819 17.7584 2 16.8364 2 15.875C2 14.9136 2.3819 13.9916 3.0617 13.3117L8.1867 8.1867C8.8666 7.5069 9.7886 7.125 10.75 7.125C11.7114 7.125 12.6334 7.5069 13.3133 8.1867C13.9931 8.8666 14.375 9.7886 14.375 10.75C14.375 11.7114 13.9931 12.6334 13.3133 13.3133L13.0204 13.6062" strokeOpacity="0.4"/>
      <path d="M15.5188 5.8546L15.8117 5.5617C16.4916 4.8819 17.4136 4.5 18.375 4.5C19.3364 4.5 20.2584 4.8819 20.9383 5.5617C21.6181 6.2416 22 7.1636 22 8.125C22 9.0864 21.6181 10.0084 20.9383 10.6883L15.8133 15.8133C15.1334 16.4931 14.2114 16.875 13.25 16.875C12.2886 16.875 11.3666 16.4931 10.6867 15.8133C10.0069 15.1334 9.625 14.2114 9.625 13.25C9.625 12.2886 10.0069 11.3666 10.6867 10.6867L10.9796 10.3938"/>
    </svg>
  )
}
